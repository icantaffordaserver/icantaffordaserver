/**
 * Created by AlexanderMann on 2016-09-29.
 */
var DB = require('../../db').DB;

var ProfileData = DB.Model.extend({
    tableName: 'profile_data',
    idAttribute: 'id',
    hasTimestamps: true,
    profileQuestions: function () {
        return this.belongsToMany(ProfileQuestions);
    },
    connections: function () {
        return this.belongsToMany(Connections, 'profile_data_has_connections');
    }
});

var ProfileQuestions = DB.Model.extend({
    tableName: 'profile_data',
    idAttribute: 'id',
    hasTimestamps: true,
    profileData: function () {
        return this.belongsToMany(ProfileData, 'profile_data_has_profile_questions');
    },
    profileAnswers: function () {
        return this.hasMany(ProfileAnswers);
    }
});

var ProfileAnswers = DB.Model.extend({
    tableName: 'profile_answers',
    idAttribute: 'id',
    hasTimestamps: true
});

var ConnectionQuestions = DB.Model.extend({
    tableName: 'connection_questions',
    idAttribute: 'id',
    hasTimestamps: true,
    connectionAnswers: function () {
        return this.hasMany(ConnectionAnswers);
    }
});

var ConnectionAnswers = DB.Model.extend({
    tableName: 'connection_answers',
    idAttribute: 'id',
    hasTimestamps: true
});

var Connections = DB.Model.extend({
    tableName: 'connections',
    idAttribute: 'id',
    hasTimestamps: true,
    connectionAnswers: function () {
        return this.hasMany(ConnectionAnswers);
    },
    profileData: function () {
        return this.belongsToMany(ProfileData, 'profile_data_has_connections');
    }
});

module.exports = {
};
