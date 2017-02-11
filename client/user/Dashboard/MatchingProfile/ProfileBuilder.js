/**
 * Created by alexandermann on 2017-02-11.
 */
import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

class ProfileBuilder extends React.Component {

  render() {
    return (
      <div>
        <iframe
          src={this.props.typeformUrl}
          className="connection-profile"
        />
        <Button negative onClick={this.props.handleCancel}>Cancel</Button>
        <Button positive floated="right" onClick={this.props.handleDone}>Done</Button>
      </div>
    );
  }
}

export default ProfileBuilder;
