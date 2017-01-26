import React from 'react';
import { connect } from 'react-redux';
import { submitInviteForm } from './actions';

class SendInvite extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitInviteForm(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      },
      this.props.auth.user.id,
      {
        resend: false,
      },
    ));
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Send Invite</h3>
        </div>
        <div className="panel-body">
          <div style={{ paddingTop: '20px' }}>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text" name="firstName" className="form-control"
                  value={this.state.firstName} onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text" name="lastName" className="form-control"
                  value={this.state.lastName} onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email" name="email" className="form-control"
                  value={this.state.email} onChange={this.handleChange.bind(this)}
                />
              </div>
              <button className="btn btn-default">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SendInvite);
