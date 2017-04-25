/**
 * Created by alexandermann on 2017-04-12.
 */
import setInviteToAccepted from '../../../helpers/setInviteToAccepted';

export default async (req, res) => {
  if (!req.body.changedUser.invite) {
    return res.sendStatus(200);
  }
  const { id, isAccepted, status, email } = req.body.changedUser.invite;
  try {
    await setInviteToAccepted(id);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
