import React from 'react';
import UpcomingConnectionRow from './UpcomingConnectionRow';

const fakeData = [
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false },
  { connectionTime: '7:30 pm Dec 1', user1: 'User 1', user2: 'User 2', user1Fs: true, user2Fs: false }
]

class UpcomingConnection extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{textAlign: 'center'}}><h3>Upcoming Connections</h3></div>
        <table className="table table-condensed">
          <tbody>
            <UpcomingConnectionRow data={fakeData}/>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UpcomingConnection;
