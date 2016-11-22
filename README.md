# shift-webapp
This is a work-in-progress. More details will be added to this readme in the future as more developers come on board.

Currently the app is a very barebones admin client, used to help automate the workflow of user testing for the Shift team. To get the app up and running you will have to clone the git repo, run npm install, setup a mysql DB with the environment configuration that you will receive from Alexander Mann.

We are going to be running this application in Heroku, therefore all major passwords and configurations will be stored in environment variables. To manage this on our development workstations we are using the dotenv Node library. I encourage you to read about it if you haven't experienced it before.

After you run npm install, setup your .env file in the root directory, download and configure MySQL, you will be good to start your development. Note we are using knex and bookshelfjs to manage the MySQL database. It is worth reading a bit about these libraries if you have not already. To initially setup and seed the database you can use the knex cli. You will need to install this module globally on your system so you can run the command from the command line.

After you have done that to setup Knex, run the following commands to setup and seed the db:
`knex migrate:latest`
`knex seed:run`

This will put in three users which you can log into the admin panel with and then start developing and testing.

To boot into development we are using the `npm run develop` command.
