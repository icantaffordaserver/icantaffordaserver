# shift-webapp
This is a work-in-progress. More details will be added to this readme in the future as more developers come on board.

Currently the app is a very barebones admin client, used to help automate the workflow of user testing for the Shift team. To get the app up and running you will have to clone the git repo, run npm install, setup a mysql DB with the environment configuration that you will receive from Alexander Mann.

We are going to be running this application in Heroku, therefore all major passwords and configurations will be stored in environment variables. To manage this on our development workstations we are using the dotenv Node library. I encourage you to read about it if you haven't experienced it before.

After you run npm install, setup your .env file in the root directory, download and configure MySQL, you will be good to start your development.

To boot into development we are using the `npm run develop` command.
