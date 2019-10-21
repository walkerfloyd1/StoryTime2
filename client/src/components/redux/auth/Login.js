import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../../actions/auth';


const Login = ({
    login,
    isAuthenticated
}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }
    if (isAuthenticated) {
        return <Redirect to="/stories" />
    }
    return (
        <div id="login-form">
            <h1>
                Sign In
            </h1>
            <p>
                Sign In To Your Account
            </p>
            <form className="form" onSubmit = { e => onSubmit(e)}>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange(e)}
                    required />
                </div>
                <input
                type="submit"
                className="btn btn-primary"
                value="Sign In" />
            </form>
            <p>
                Don't have an account? <Link to="/signup">Register</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticed: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    login
})(Login);
