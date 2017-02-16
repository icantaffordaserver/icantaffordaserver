import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import { updateProfile, changePassword, deleteAccount } from './actions';
import { link, unlink } from '../OAuth/actions';
import Messages from '../Messages';
import AccountMenuTabs from './AccountMenuTabs';
import ProfileComponent from './ProfileComponent';
import AccountComponent from './AccountComponent';
import ChangePasswordComponent from './ChangePasswordComponent';
import DeleteAccountComponent from './DeleteAccountComponent';
import SocialComponent from './SocialComponent';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'account',
      email: props.user.email,
      firstName: props.user.profile.first_name,
      lastName: props.user.profile.last_name,
      gender: props.user.profile.gender,
      location: props.user.profile.city || '',
      gravatar: props.user.gravatar,
      password: '',
      confirm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleChange(event, data) {
    this.setState({ [data.name]: data.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider));
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  renderPanel() {
    switch (this.state.activeItem) {
      case 'account':
        return (<AccountComponent
          {...this.state}
          handleChange={this.handleChange}
          handleProfileUpdate={this.handleProfileUpdate}
        />);
      case 'profile':
        return (<ProfileComponent
          {...this.state}
          handleChange={this.handleChange}
          handleProfileUpdate={this.handleProfileUpdate}
        />);
      case 'change password':
        return (<ChangePasswordComponent
          {...this.state}
          handleChange={this.handleChange}
          handleChangePassword={this.handleChangePassword}
        />);
      case 'social':
        return (<SocialComponent
          {...this.state}
          handleChange={this.handleChange}
        />);
      case 'delete account':
        return (<DeleteAccountComponent
          {...this.state}
          handleDeleteAccount={this.handleDeleteAccount}
        />);
      default:
        return null;
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Grid centered>
        <Grid.Column width={16}>
          <Header as="h1" color="teal">Account Information</Header>
        </Grid.Column>
        <Grid.Column stretched width={4}>
          <AccountMenuTabs
            activeItem={activeItem}
            handleItemClick={this.handleItemClick}
          />
        </Grid.Column>
        <Grid.Column width={8} textAlign="left">
          <Messages messages={this.props.messages} />
          {this.renderPanel()}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  user: state.auth.user,
  messages: state.messages,
});

export default connect(mapStateToProps)(Account);
