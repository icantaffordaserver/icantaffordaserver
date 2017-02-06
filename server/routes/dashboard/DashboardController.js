/**
 * Created by alexandermann on 2017-02-04.
 */
import { UserAccounts } from '../../models/UserAccounts';
import ConnectionQueue from '../../models/ConnectionQueue';

export async function myConnectionsGet(req, res, next) {
  try {
    const myConnections = await new UserAccounts({ id: req.user.id }).connections().fetch({ withRelated: 'accounts.profile' });
    res.status(200).send({
      status: 'success',
      myConnections: myConnections.toJSON(),
    });
  } catch (err) {
    console.log(err);
  }
}

export async function requestConnectionPost(req, res, next) {
  try {
    const connectionQueue = await new ConnectionQueue({
      user_account_id: req.user.id,
      comment: req.body.comment,
    }).save(null, { method: 'insert' });
    res.status(201).send({
      msg: 'Connection successfully requested.',
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: 'An error occurred while trying to request your connection' });
  }
}