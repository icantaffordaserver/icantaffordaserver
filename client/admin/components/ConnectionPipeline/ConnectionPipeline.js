import React from 'react';
import MatchedUsers from './MatchedUsers';

class ConnectionPipeline extends React.Component {
  render() {
    return (
      <div className="connection-pipeline container-fluid">
        <div className="row">
          <div className="col-md-4">
            <MatchedUsers />
          </div>
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectionPipeline;
