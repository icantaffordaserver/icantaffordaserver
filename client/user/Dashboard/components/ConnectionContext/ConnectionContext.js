/**
 * Created by alexandermann on 2017-02-09.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Segment, Menu } from 'semantic-ui-react';
import RequestConnection from './RequestConnection';
import RequestPending from './RequestPending';
import UserMatched from './UserMatched';
import ConnectionCountdown from './ConnectionCountdown';
import SetTimePreferences from '../DateTimePreference';
import { requestConnection } from '../../actions';

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

  renderContext() {
    const { allConnections, isQueued } = this.props.myConnections;
    // Check that there are some connections
    if (allConnections.length > 0) {
      // If most recent connection does not have status matched or scheduled
      if (allConnections[0].status !== 'matched' && allConnections[0].status !== 'scheduled') {
        if (isQueued) {
          return (
            <RequestPending />
          );
        }
        return (
          <RequestConnection
            upcomingConnection={this.props.myConnections.allConnections[0]}
            requestConnection={this.handleRequestConnection}
            isAllowed={!this.props.myConnections.isQueued && this.props.auth.user.email_verified}
            connectionStatus={'allowed'}
          />
        );
      }
      if (allConnections[0].status === 'matched') {
        return (<UserMatched />);
      }
      // Most recent connection status === scheduled
      return (
        <ConnectionCountdown
          upcomingConnection={allConnections[0]}
        />
      );
    }
    return (<RequestConnection />);
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
        <Segment attached="bottom" padded="very">
          {activeItem === 'status' && (
            this.renderContext()
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
