/**
 * Created by alexandermann on 2017-01-10.
 */
const environment = 'development';
const faker       = require('faker');
const config      = require('../../knexfile')[environment];
const knex        = require('knex')(config);

// TODO: GOAL
// Generate a bunch of test data and *fake* connections to test the front end UI
// Return arrays of all the created data
function createUserAccounts(amountToCreate) {
    amountToCreate = amountToCreate - 1; //to account for the admin user
    // Make sure we insert an administrator
    const adminUser            = {
        userAccount: {
            email: 'admin@shiftwith.us',
            password_hash: '$2a$10$9YI/gWn0ROXAEU9lU2wo7e9.t3WjEIKV5bD76AtPBLtKV7RPbgoiq', // hello
            phone_number: '6047070744', // uncle fatihs, because why not
            admin: true
        },
        userProfile: {
            first_name: 'ShiftAdmin',
            last_name: 'ShiftAdmin',
            gender: faker.random.number(1) ? 'female' : 'male',
            city: 'Vancouver',
            state_province: 'British Columbia',
            country: 'Canada'
        }
    };
    const userAccountsProfiles = [adminUser];

    for (let i = 0; i < amountToCreate; i++) {
        let randomNumber = faker.random.number(1);
        let gender       = randomNumber; // 0 is male, 1 is female
        let firstName    = faker.name.firstName(gender);
        let lastName     = faker.name.lastName(gender);

        userAccountsProfiles.push({
            userAccount: {
                email: faker.internet.exampleEmail(firstName, lastName),
                password_hash: '$2a$10$iv5IIorQM.dJn.0hdAatVuAHtJwwtUzOfsEPyvHFTKgpquStgK5Am', // hello
                phone_number: faker.phone.phoneNumber('##########')
            },
            userProfile: {
                first_name: firstName,
                last_name: lastName,
                gender: randomNumber ? 'female' : 'male',
                city: faker.address.city(),
                state_province: faker.address.state(),
                country: faker.address.country()
            }
        });
    }
    return userAccountsProfiles;
}
async function seedUsers(amountToCreate) {
    const accountsTable = 'user_accounts';
    const profilesTable = 'user_profiles';
    await knex(accountsTable).del(); // delete all existing entries in the table
    await knex(profilesTable).del(); // delete all existing entries in the table
    let users = createUserAccounts(amountToCreate);

    for (let user of users) {
        try {
            let userId     = await knex(accountsTable).insert(user.userAccount, 'id');
            let profileObj = Object.assign({}, {user_account_id: userId[0]}, user.userProfile);
            await knex(profilesTable).insert(profileObj);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    let userAccounts = await knex.select().table(accountsTable);
    console.log(userAccounts);
}

// Run the script
(async() => {
    await seedUsers(100);
    process.exit();
})();