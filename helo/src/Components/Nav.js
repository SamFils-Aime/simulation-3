import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { FiHome, FiFilePlus, FiPower } from "react-icons/fi";

import { logout, getSession } from "../ducks/reducers/userReducer";

class Nav extends Component {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <nav>
        {this.props.user_id ? null : <Redirect to="/" />}
        <div className="profile">
          <img
            className="profile--img"
            src={`https://robohash.org/${this.props.username}`}
            alt=""
          />
          <p className="profile--username">{this.props.username}</p>
        </div>

        <div className="links">
          <Link to="/dashboard">
            <FiHome />
          </Link>
          
          <Link to="/new">
            <FiFilePlus />
          </Link>
        </div>

        <div className="logout">
          <FiPower onClick={this.props.logout} />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  user_id: reduxState.user.user_id,
  username: reduxState.user.username,
});

export default connect(mapStateToProps, { logout, getSession })(Nav);
