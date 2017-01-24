import React from 'react';
import MatchedUsersRow from './MatchedUserRow/MatchedUsersRow';

class MatchedUsers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading" style={{textAlign: 'center'}}><h3>Matched Users</h3></div>
                <table className="table table-condensed">
                    <tbody>
                    {this.props.matchedUsers.map((data, index) => {
                        if (data.status === 'matched' || data.status === 'scheduled') {
                            return <MatchedUsersRow key={data.id} data={data} index={index}/>;
                        }
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}



export default MatchedUsers;
