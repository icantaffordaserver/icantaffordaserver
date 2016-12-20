## Shift Web App

### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: handlebars
- **CSS Framework**: bootstrap
- **CSS Preprocessor**: sass
- **JavaScript Framework**: react
- **Build Tool**: webpack
- **Unit Testing**: mocha
- **Database**: postgresql
- **Authentication**: facebook,email
- **Deployment**: heroku

### Project Structure
```
.
├── client/                    # Containing folder for all client side code
│   ├── admin/                 # The Admin react client
│       ├── actions/           # Redux actions
│       ├── components/        # React components
│       ├── reducers/          # Redux reducers
│       ├── store/             # Store initialization and configuration
│       ├── main.js            # Client-side app entry-point
│       ├── routes.js          # Universal application routes (React Router)
├── controllers/               # Express route handlers
├── models/                    # Express database models
├── public/                    
│   ├── css/                   # Sass/LESS/PostCSS/CSS stylesheets (both source and generated)
│   ├── fonts/                 # Font Awesome web fonts
│   ├── js/                    # Third-party vendor files and generated React app (bundle.js)
├── server/                    # All server side code stored here
│   ├── config/                # Configuration files for OAuth, database, etc.
│   ├── controllers/           # Express route handlers
│   ├── data/                  # Database migrations, seed data, etc.
│   │   ├── migrations/        # Postgres migrations
│   ├── mail/                  # Mail helpers to send emails via Mandrill
│   ├── models/                # Express database models
│   ├── routes/                # Server side routes
│   ├── index.js               # Main express application
├── test/                      # Unit tests    
├── views/                     # Templates in handlebars, layout.handlebars where react app is rendered
├── .babelrc                   # Babel config
├── .env                       # API keys, passwords, and other sensitive information
└── package.json               # NPM Dependencies and scripts
```