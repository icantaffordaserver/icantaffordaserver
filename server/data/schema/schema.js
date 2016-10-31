module.exports = {
    users: {
        id: {type: 'increments', nullable: false, primary: true},
        email: {type: 'string', maxlength: 191, nullable: false, unique: true, validations: {isEmail: true}},
        username: {type: 'string', maxlength: 150, nullable: false, unique: true},
        password: {type: 'string', maxlength: 60, nullable: false},
        email_verified: {type: 'bool', nullable: false, defaultTo: false},
        email_verified_token: {type: 'string', maxlength: 150, nullable: false, unique: true},
        last_login: {type: 'dateTime', nullable: true},
        created_at: {type: 'dateTime', nullable: false},
        created_by: {type: 'integer', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        updated_by: {type: 'integer', nullable: true}

    },

};