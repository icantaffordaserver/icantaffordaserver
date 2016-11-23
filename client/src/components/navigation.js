import React, {Component} from 'react';
import {Link} from 'react-router';

class NavBar extends Component {

    renderNavigationLinks(){
        return(
            <ul>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        )
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">Admin Email Sender</Link>
                    {this.renderNavigationLinks()}
                </div>
            </nav>
        )
    }
}

export default NavBar;