import React from 'react';
import moment from 'moment';

class ConnectionDetails extends React.Component {
  formatConnectionTime(connectionTime) {
    return moment(connectionTime).isValid()
            ? moment(connectionTime).format('hh:mm A on MMM Do, YYYY') : 'Not Set';
  }

  formatTitle(accounts, ending) {
    return `${accounts[0].profile.first_name} ${accounts[0].profile.last_name}
                     and ${accounts[1].profile.first_name} ${accounts[1].profile.last_name} ${ending}`;
  }

  render() {
    const { selectedMatch } = this.props;
    const { accounts, matchedBy, connection_time } = selectedMatch;
    return (
      <div className="modal-content">
        <div className="modal-header" style={{ textAlign: 'center' }}>
          <h3>{this.formatTitle(accounts, this.props.titleEnding)}</h3>
        </div>
        <div className="modal-body">
          <div>
            <div><label>Connection ID:</label> {selectedMatch.id}</div>
            <div><label>Matched By:</label> {`${matchedBy.profile.first_name} ${matchedBy.profile.last_name}`}</div>
            <div><label>Connection Time:</label> {this.formatConnectionTime(connection_time)}</div>
          </div>
          {accounts.map((account) => {
            const { profile, phone_number, email, gravatar } = account;
            const { first_name, last_name, gender, city, state_province, country } = profile;
            return (
              <div key={account.id} className="media">
                <div className="media-left">
                  <img src={gravatar} className="media-object" width="75px" />
                </div>
                <div className="media-body">
                  <div><label>Name:</label> {`${first_name} ${last_name}`}</div>
                  <div className="capitalize"><label>Gender: </label> {gender}</div>
                  <div><label>Location:</label> {`${city}, ${state_province} (${country})`}</div>
                  <div><label>Phone Number:</label> {phone_number}</div>
                  <div><label>Email:</label> {email}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="modal-footer">
          <button className="btn btn-success">Save</button>
          <button
            onClick={this.props.handleCloseModal}
            className="btn btn-danger"
          >Cancel
                    </button>
        </div>
      </div>
    );
  }
}

export default ConnectionDetails;
