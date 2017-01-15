import React from 'react';
import { connect } from 'react-redux';
import { fetchInvites, cancelInvite, resendInvite } from '../../actions/invites';
import moment from 'moment';

class InvitesSent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchInvites());
  }

  handleCancelInvite(inviteId) {
    this.props.dispatch(cancelInvite(inviteId));
  }

  handleSubmit(inviteId, event) {
    event.preventDefault();
    this.props.dispatch(resendInvite(inviteId));
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><h3>Invites Sent</h3></div>
        <table className="table table-condensed">
          <tbody>
            <tr>
              <th>Date Sent</th>
              <th>Sent By</th>
              <th>To</th>
              <th>Accepted?</th>
              <th>Cancel</th>
              <th>Resend</th>
            </tr>
            {this.props.invites.map((invite) => {
              return (
                <tr key={invite.id}>
                  <td>{moment(invite.created_at).format('MMM Do, YYYY')}</td>
                  <td>{invite.account.profile.first_name}</td>
                  <td>{invite.email}</td>
                  <td>{invite.accepted ?
                    <i className="material-icons brand-success valign">done</i> :
                    <i className="material-icons brand-danger valign">clear</i>}
                  </td>
                  <td>
                    <button disabled={invite.accepted} className="btn btn-danger" onClick={this.handleCancelInvite.bind(this, invite.id)}>Cancel</button>
                  </td>
                  <td>
                    <button className="btn btn-default" onClick={this.handleSubmit.bind(this, invite.id)}>Send</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    invites: state.invites
  };
};

export default connect(mapStateToProps)(InvitesSent);
