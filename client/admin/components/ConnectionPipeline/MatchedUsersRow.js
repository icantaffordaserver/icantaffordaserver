import React from 'react';
import moment from 'moment';

class MatchedUsersRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <div>Matched on: {moment(this.props.data.created_at).format('MMM Do, YYYY')}</div>
          <div>Matched by: {this.props.data.matchedBy.profile.first_name}</div>
        </td>
        <td>
          <div>
            {this.props.data.accounts.map((account) => {
                return (
                  <div key={account.id}>
                    {account.profile.first_name + ' ' + account.profile.last_name}
                  </div>
                );
            })}
          </div>
        </td>
        <td>
          <button className="btn btn-default" style={{whiteSpace: 'normal', width: '100px'}}>
            Set Connection Time
          </button>
        </td>
        <td>
          <button className="btn btn-default">Details</button>
        </td>
      </tr>
    );
  }
}

export default MatchedUsersRow;
