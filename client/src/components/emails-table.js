import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchEmailsSent} from '../actions/index';
import {bindActionCreators} from 'redux';


class EmailsTable extends Component {

    // On page load make a request to get all the emails
    componentWillMount() {
        this.props.fetchEmailsSent();

    }


    refreshTableData() {
        this.props.fetchEmailsSent();
    }

    renderRow() {
        if (!this.props.emails) {
            return (
                <tr><td>Loading...</td></tr>
            )
        }

        return this.props.emails.map((row)=>{
            return (
                <tr key={row.id}>
                    <td>{row.date_time_sent}</td>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                    <td>{row.template}</td>

                </tr>
            )
        })


    }

    render() {
        return (
            <div>
                <h3>Emails Sent</h3>
                <button className="btn" onClick={this.refreshTableData.bind(this)}>Refresh Table Data</button>
                <table>
                    <thead>
                    <tr>
                        <th >Date</th>
                        <th >First Name</th>
                        <th >Last Name</th>
                        <th >Email</th>
                        <th >Template</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.renderRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        emails: state.emails.all
    }

}

function mapDispatchToProps(dispatch) {
    // Whenever setActiveForm is called, the result should be passed to all of our reducers
    return bindActionCreators({fetchEmailsSent}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailsTable);