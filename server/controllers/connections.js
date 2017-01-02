/**
 * Created by alexandermann on 2016-12-23.
 */
import {Connections} from '../models/UserAccounts'

/**
 * GET /connections
 *
 */
export async function allConnectionsGet(req, res, next) {
    try {
        let allConnections = await Connections.fetchAll({withRelated: 'accounts.profile1'});
        res.send(allConnections.toJSON());
    } catch (err) {
        console.log(err);
        res.status(400).send({msg: 'An error occurred while fetching all connections'});
    }
}

/**
 * GET /connections/:id
 *
 */
export function connectionGet(req, res, next) {
    new Connections({id: req.body.connection_id}).fetch({withRelated: 'accounts.profile'})
        .then(connection => {
            if (connection === null) {
                return res.send({msg: 'Connection does not exist.'});
            }
            res.send(connection.toJSON());
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({msg: 'An error occurred while trying to get connection data'});
        })
}

/**
 * POST /connections
 *
 */
export function newConnectionPost(req, res, next) {
    new Connections({status: 'matched', matched_by: req.body.admin_user_id}).save()
        .then(connection => {
            return connection.accounts().attach([req.body.user1_id, req.body.user2_id]);
        })
        .then(result => {
            res.send({msg: 'Users have been matched.'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({msg: 'Unable to match users.'});
        })
}

/**
 * PUT /connections/:id
 *
 * Could be changing a user, updating connection status
 */
// TODO: finish update connection PUT request
export function updateConnectionPut(req, res, next) {
    res.send({msg: 'This is not done yet..'});
}

/**
 * DELETE /connections/:id
 *
 */
export async function connectionDelete(req, res, next) {
    new Connections({id: req.params.id}).destroy({require: true})
        .then((connection) => {
            // console.log(connection);
            res.send({msg: 'Connection successfully deleted.'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({msg: 'An error occurred while trying to delete the connection.'});
        });
}