import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

const Navbar = ({
    auth: {
        isAuthenticated,
        loading
    },
    logout
}) => {
    const authLinks = (
        <ul>
          <li>
            <Link to="/stories">Stories</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li><Link to="/profiles">
          Community</Link></li>
            <li><a onClick={logout} href="#!"><i className='fas fa-sign-out-alt'></i>{' '}
            Logout</a></li>
          </ul>
      );

      const guestLinks = (
        <ul>
            <li><Link to="/stories">Stories</Link></li>
            <li><Link to="/signup">Register</Link></li>
            <li><Link to="/signin">Login</Link></li>
          </ul>
      );
    return (
        <div>
            <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> StoryTeller</Link>
      </h1>
      { !loading && (<Fragment>
        {isAuthenticated ? authLinks : guestLinks }
      </Fragment>)}
    </nav>
        </div>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
