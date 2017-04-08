const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../config/bookshelf');

const UserAccounts = bookshelf.Model.extend({
  tableName: 'user_accounts',
  idAttribute: 'id',
  hasTimestamps: true,

  initialize() {
    this.on('loading', this.hashPassword, this);
  },

    // for all relations, make sure to RETURN
  profile() {
    return this.hasOne(UserProfiles, 'user_account_id');
  },

  invites() {
    return this.hasMany(Invites, 'sent_by_user_account_id');
  },

  connections() {
    return this.belongsToMany(Connections, 'users_connections', 'user_account_id', 'connection_id');
  },

  connection_progress() {
    return this.hasMany(ConnectionProgress, 'user_account_id');
  },

    // this function is called when the object fires the event 'loading' and it checks if an attribute
    // password was passed.
    // seems like this is run every time the UserAccounts fires the 'loading' event.
    // This may be unnecessary then and rework into functions only where the password
    // is required to be saved...
  hashPassword(model, attrs, options) {
      // attrs are attributes that will be inserted or updated, if present
    const password = options.patch ? attrs.password_hash : model.get('password_hash');
    if (!password) {
      return;
    }
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (options.patch) {
            attrs.password_hash = hash;
          }
          model.set('password_hash', hash);
          resolve();
        });
      });
    });
  },

  comparePassword(password, done) {
    const model = this;
    bcrypt.compare(password, model.get('password_hash'), (err, isMatch) => {
      done(err, isMatch);
    });
  },

    // use the visibility plugin to hide these fields
  hidden: ['password_hash', 'passwordResetToken', 'passwordResetExpires'],

  virtuals: {
    gravatar() {
      if (!this.get('email')) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
      }
      const md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
      return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
    },
  },
},

  // Class/Static functions and properties attached to the constructor
  {
    dependents: ['profile'], // specify the dependent relations for cascade-delete plugin

  },
);

let UserProfiles = bookshelf.Model.extend({
  tableName: 'user_profiles',
  idAttribute: 'user_account_id',
  hasTimestamps: true,

  account() {
    return this.belongsTo(UserAccounts, 'user_account_id');
  },
});

let Invites = bookshelf.Model.extend({
  tableName: 'invites',
  idAttribute: 'id',
  hasTimestamps: true,

  account() {
    return this.belongsTo(UserAccounts, 'sent_by_user_account_id'); // second argument, column of the foreign key, in this model
  },

});

const InviteRequests = bookshelf.Model.extend({
  tableName: 'invite_requests',
  idAttribute: 'id',
  hasTimestamps: true,

  invite() {
    return this.belongsTo(Invites, 'invite_id'); // second argument, column of the foreign key, in this model
  },

});

let Connections = bookshelf.Model.extend({
  tableName: 'connections',
  idAttribute: 'id',
  hasTimestamps: true,

  accounts() {
    return this.belongsToMany(UserAccounts, 'users_connections', 'connection_id', 'user_account_id');
  },

  progress() {
    return this.hasMany(ConnectionProgress, 'connection_id');
  },

  matchedBy() {
    return this.belongsTo(UserAccounts, 'matched_by');
  },

});

let ConnectionProgress = bookshelf.Model.extend({
  tableName: 'connection_progress',
  idAttribute: 'id',

  account() {
    return this.belongsTo(UserAccounts, 'user_account_id');
  },

  connection() {
    return this.belongsTo(Connections, 'connection_id');
  },


});

module.exports.UserAccounts = UserAccounts;
module.exports.UserProfiles = UserProfiles;
module.exports.Invites = Invites;
module.exports.InviteRequests = InviteRequests;
module.exports.Connections = Connections;
module.exports.ConnectionProgress = ConnectionProgress;
