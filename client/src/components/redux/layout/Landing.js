import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    else {
    return (
    <section className="landing">
      <div>
        <div>
          <h1 className="x-large">StoryTeller</h1>
          <p className="lead">
            Create a story with others!
          </p>
          <div className="buttons">
            <Link to="/signin" className="btn btn-primary">Sign In</Link>
            <Link to="/signup" className="btn btn-light">Register</Link>
          </div>
        </div>
      </div>
    </section>
    )
    }
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
