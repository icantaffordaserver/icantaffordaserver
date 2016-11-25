import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';


import {submitForm} from '../actions/index'

class FormDetail extends Component {
    onSubmit(props) {
        this.props.submitForm(props, this.props.activeForm)
    }


    renderForm() {
        switch (this.props.activeForm) {
            case 'PROFILE_BUILDING':
                return (
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email"/>
                        </div>
                    </div>
                );
            case 'PRE_CONNECTION':
                return (
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email"/>
                        </div>
                        <div>
                            <label htmlFor="matchFirstName">Match's First Name</label>
                            <Field name="matchFirstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="matchLastName">Match's Last Name</label>
                            <Field name="matchLastName" component="input" type="text"/>
                        </div>
                    </div>
                );
            case 'SHIFT_SCHEDULED':
                return (
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email"/>
                        </div>
                        <div>
                            <label htmlFor="matchFirstName">Match's First Name</label>
                            <Field name="matchFirstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="matchLastName">Match's Last Name</label>
                            <Field name="matchLastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="timeOfShift">Time of Shift</label>
                            <Field name="timeOfShift" component="input" type="text"/>
                        </div>
                    </div>
                );
            case 'SHIFT_TODAY':
                return (
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email"/>
                        </div>
                        <div>
                            <label htmlFor="timeOfShift">Time of Shift</label>
                            <Field name="timeOfShift" component="input" type="text"/>
                        </div>
                    </div>
                );
            case 'POST_CONNECTION':
                return (
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email"/>
                        </div>
                        <div>
                            <label htmlFor="connectionId">Connection ID</label>
                            <Field name="connectionId" component="input" type="text"/>
                        </div>
                    </div>
                );
            case 'REVIEW':
                return (
                    <div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component="input" type="email"/>
                        </div>
                        <div>
                            <label htmlFor="matchFirstName">Match's First Name</label>
                            <Field name="matchFirstName" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="matchLastName">Match's Last Name</label>
                            <Field name="matchLastName" component="input" type="text"/>
                        </div>
                    </div>
                );
        }

    }


    render() {
        // Redux form provides these fields to us on this.props
        const {handleSubmit} = this.props; // === const onSubmit = this.props.onSubmit ES6 syntax

        // Check if an active form has been selected
        if (!this.props.activeForm) {
            return (
                        <div className="section">
                            <h3>Select a form to get started</h3>
                        </div>
            )
        }


        return (
                    <div className="section">
                        <h3>{this.props.activeForm}</h3>

                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            {this.renderForm()}
                            <button className="btn" type="submit">Submit</button>
                        </form>
                    </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeForm: state.activeForm //state comes from reducers index.js "state.activeForm" is created there
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitForm: submitForm
    };
}

// Followed tutorial here http://redux-form.com/6.2.0/examples/initializeFromState/
FormDetail = reduxForm({
    form: 'simple'
})(FormDetail);

// export default FormDetail;
export default connect(mapStateToProps, mapDispatchToProps)(FormDetail);