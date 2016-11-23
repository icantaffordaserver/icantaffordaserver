import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {setActiveForm} from '../actions/index';
import {bindActionCreators} from 'redux';

const TABS = {
    PROFILE_BUILDING: {
        title: 'Profile Building',
        absoluteTitle: 'PROFILE_BUILDING'

    },
    PRE_CONNECTION: {
        title: 'Pre Connection',
        absoluteTitle: 'PRE_CONNECTION'

    },
    SHIFT_SCHEDULED: {
        title: 'Shift Scheduled',
        absoluteTitle: 'SHIFT_SCHEDULED'

    },
    SHIFT_TODAY: {
        title: 'Shift Today',
        absoluteTitle: 'SHIFT_TODAY'

    },
    POST_CONNECTION: {
        title: 'Post Connection',
        absoluteTitle: 'POST_CONNECTION'

    },
    REVIEW: {
        title: 'Review',
        absoluteTitle: 'REVIEW'

    }
};

class FormBar extends Component {

    renderTabs(title, absoluteTitle) {

        return (
            <li className="tab col s2"
                onClick={() => this.props.setActiveForm(absoluteTitle)}>
                <a className={this.props.activeForm === absoluteTitle ? 'active' : ''}>{title}</a>
            </li>
        );
    }

    render() {
        return (
            <ul className="tabs z-depth-1">
                <li className="tab col s2"
                    onClick={() => this.props.setActiveForm(TABS.PROFILE_BUILDING.absoluteTitle)}>
                    <a className={this.props.activeForm === TABS.PROFILE_BUILDING.absoluteTitle ? 'active' : ''}>{TABS.PROFILE_BUILDING.title}</a>
                </li>
                <li className="tab col s2"
                    onClick={() => this.props.setActiveForm(TABS.PRE_CONNECTION.absoluteTitle)}>
                    <a className={this.props.activeForm === TABS.PRE_CONNECTION.absoluteTitle ? 'active' : ''}>{TABS.PRE_CONNECTION.title}</a>
                </li>
                <li className="tab col s2"
                    onClick={() => this.props.setActiveForm(TABS.SHIFT_SCHEDULED.absoluteTitle)}>
                    <a className={this.props.activeForm === TABS.SHIFT_SCHEDULED.absoluteTitle ? 'active' : ''}>{TABS.SHIFT_SCHEDULED.title}</a>
                </li>
                <li className="tab col s2"
                    onClick={() => this.props.setActiveForm(TABS.SHIFT_TODAY.absoluteTitle)}>
                    <a className={this.props.activeForm === TABS.SHIFT_TODAY.absoluteTitle ? 'active' : ''}>{TABS.SHIFT_TODAY.title}</a>
                </li>
                <li className="tab col s2"
                    onClick={() => this.props.setActiveForm(TABS.POST_CONNECTION.absoluteTitle)}>
                    <a className={this.props.activeForm === TABS.POST_CONNECTION.absoluteTitle ? 'active' : ''}>{TABS.POST_CONNECTION.title}</a>
                </li>
                <li className="tab col s2"
                    onClick={() => this.props.setActiveForm(TABS.REVIEW.absoluteTitle)}>
                    <a className={this.props.activeForm === TABS.REVIEW.absoluteTitle ? 'active' : ''}>{TABS.REVIEW.title}</a>
                </li>
            </ul>
        );
    }
}

// Whenever our application state changes, this container will automatically re-render with any updated changes
// The object returned below will be assigned to the props object
function mapStateToProps(state) {
    return {
        activeForm: state.activeForm
    }
}

// Anything returned from this function will end up as props on the FormBar container
// In this case it will be the first argument that we've passed {setActiveForm}

// The only part of our app that cares about these actions are the reducers
// The purpose of bind action creators and dispatch is to take what gets returned
// from setActive form and make sure that it flows through all the reducers
function mapDispatchToProps(dispatch) {
    // Whenever setActiveForm is called, the result should be passed to all of our reducers
    return bindActionCreators({setActiveForm: setActiveForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBar);