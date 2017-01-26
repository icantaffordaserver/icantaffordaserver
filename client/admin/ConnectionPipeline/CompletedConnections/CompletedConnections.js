/**
 * Created by alexandermann on 2017-01-17.
 */
import React from 'react';
import CompletedConnectionRow from './CompletedConnectionRow/CompletedConnectionRow';

class CompletedConnections extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{ textAlign: 'center' }}><h3>Completed Connections</h3></div>
        <table className="table table-condensed">
          <tbody>
            {this.props.matchedUsers.map((data, index) => {
              if (data.status === 'completed') {
                return <CompletedConnectionRow key={data.id} index={index} data={data} />;
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CompletedConnections;
