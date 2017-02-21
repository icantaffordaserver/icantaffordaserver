/**
 * Created by alexandermann on 2017-02-05.
 */
import bookshelf from '../config/bookshelf';
import { UserAccounts } from './UserAccounts';

const ConnectionQueue = bookshelf.Model.extend({
  tableName: 'connection_queue',
  idAttribute: 'id',
  hasTimestamps: true,

  account() {
    return this.belongsTo(UserAccounts, 'user_account_id');
  },

});

export default ConnectionQueue;