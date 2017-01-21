import React from 'react';
import {IndexLink, Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../admin/actions/auth';

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(logout());
    }

    render() {
        const active   = {borderBottomColor: '#3f51b5'};
        const adminNav = this.props.token ? (
                <ul className="nav navbar-nav">
                    <li><IndexLink to="/" activeStyle={active}>Home</IndexLink></li>
                    <li><Link to="/admin/dashboard" activeStyle={active}>Dashboard</Link></li>
                    <li><Link to="/admin/matching" activeStyle={active}>User Matching</Link></li>
                    <li><Link to="/admin/pipeline" activeStyle={active}>Pipeline</Link></li>
                    <li><Link to="/contact" activeStyle={active}>Contact</Link></li>
                </ul>
            ) : (
                <ul className="nav navbar-nav">
                    <li><IndexLink to="/" activeStyle={active}>Home</IndexLink></li>
                    <li><Link to="/contact" activeStyle={active}>Contact</Link></li>
                </ul>
            );
        const rightNav = this.props.token ? (
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" data-toggle="dropdown" className="navbar-avatar dropdown-toggle">
                            <img src={this.props.user.picture || this.props.user.gravatar}/>
                            {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
                            <i className="caret"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to="/account">My Account</Link></li>
                            <li className="divider"></li>
                            <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
                        </ul>
                    </li>
                </ul>
            ) : (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/login" activeStyle={active}>Log in</Link></li>
                    <li><Link to="/signup" activeStyle={active}>Sign up</Link></li>
                </ul>
            );
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" data-toggle="collapse" data-target="#navbar"
                                className="navbar-toggle collapsed">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <IndexLink to="/" className="navbar-brand">Shift Admin</IndexLink>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        {adminNav}
                        {rightNav}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Header);
