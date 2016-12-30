import React from 'react';
import { connect } from 'react-redux';
import { fetchInvites } from '../../actions/invites';

class InvitesSent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchInvites());
  }

  render() {
    let invites = Array.isArray(this.props.invites) ? this.props.invites : [this.props.invites];

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
              <th>Resend</th>
            </tr>
            {invites.map((invite) => {
              return (
                <tr key={invite.id}>
                  <td>{invite.created_at}</td>
                  <td>{invite.sent_by_user_account_id}</td>
                  <td>{invite.email}</td>
                  <td>{invite.accepted ?
                    <i className="material-icons brand-success valign">done</i> :
                    <i className="material-icons brand-danger valign">clear</i>}
                  </td>
                  <td><button className="btn btn-default">Send</button></td>
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
    invites: state.invites
  };
};

export default connect(mapStateToProps)(InvitesSent);
