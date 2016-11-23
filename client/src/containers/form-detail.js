import React, {Component} from 'react';
import {connect} from 'react-redux';

class FormDetail extends Component {

    render() {
        if (!this.props.activeForm) {
            return <div>Select a form to get started!</div>
        }

        return (
            <h3>Currently Selected Form: {this.props.activeForm}</h3>
        );
    }
};

function mapStateToProps(state) {
    return {
        activeForm: state.activeForm
    }
}

export default connect(mapStateToProps)(FormDetail);