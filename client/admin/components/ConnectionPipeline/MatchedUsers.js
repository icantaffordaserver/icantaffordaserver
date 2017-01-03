import React from 'react';
import MatchedUsersRow from './MatchedUsersRow';
import { connect } from 'react-redux';
import { fetchMatchedUsers } from '../../actions/connections';

class MatchedUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchMatchedUsers());
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{textAlign: 'center'}}><h3>Matched Users</h3></div>
        <table className="table table-condensed">
          <tbody>
            {this.props.matchedUsers.map((data) => {
              return <MatchedUsersRow key={data.id} data={data} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { matchedUsers: state.matchedUsers };
}

export default connect(mapStateToProps)(MatchedUsers);
