/**
 * Created by alexandermann on 2017-02-09.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Segment, Menu } from 'semantic-ui-react';
import RequestConnection from './RequestConnection';
import SetTimePreferences from './DateTimePreference';
import { requestConnection } from '../actions';

class ConnectionContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'status' };
    this.handleRequestConnection = this.handleRequestConnection.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleRequestConnection(comment) {
    this.props.dispatch(requestConnection(comment));
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="status"
            active={activeItem === 'status'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="availability"
            active={activeItem === 'availability'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Segment attached="bottom">
          {activeItem === 'status' && (
            <RequestConnection
              requestConnection={this.handleRequestConnection}
              isAllowed={!this.props.myConnections.isQueued && this.props.auth.user.email_verified}
              connectionStatus={'allowed'}
            />
          )}
          {activeItem === 'availability' && (
            <SetTimePreferences />
          )}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ConnectionContext);
