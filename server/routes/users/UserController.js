/**
 * Created by alexandermann on 2017-02-03.
 */
import { UserAccounts } from '../../models/UserAccounts';
/**
 * GET /users
 * Get all signed up users
 */
export async function allUsersGet(req, res, next) {
  const allUserAccounts = await UserAccounts.fetchAll({ withRelated: 'profile' });
  res.status(200).send({
    status: 'success',
    data: allUserAccounts.toJSON(),
  });
}

/**
 * GET /users/:userId
 * Get a user by their uuid
 * @param req
 * @param res
 * @param next
 */
export async function singleUserGet(req, res, next) {
  const userAccount = await new UserAccounts({ id: req.params.userId }).fetch({ withRelated: 'profile' });
  res.status(200).send({
    status: 'success',
    data: userAccount.toJSON(),
  });
}
