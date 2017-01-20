import React from 'react';
import classnames from 'classnames';

class UsersPoolHeader extends React.Component {
  getBtnClasses(index) {
    return classnames(
      'btn', 'btn-default', 'navbar-btn', {active: this.props.userIndex === index}
    );
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <form className="navbar-form navbar-right">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" onChange={this.props.setSearchText}/>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <div className="btn-group">
                  <button type="button"
                    className={this.getBtnClasses.bind(this, 0)()}
                    onClick={this.props.setUserIndex.bind(null, 0)}>
                    User 1
                  </button>
                  <button type="button"
                    className={this.getBtnClasses.bind(this, 1)()}
                    onClick={this.props.setUserIndex.bind(null, 1)}>
                    User 2
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default UsersPoolHeader;
