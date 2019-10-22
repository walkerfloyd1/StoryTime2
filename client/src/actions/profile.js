import axios from 'axios';
import { setAlert } from './alert';


import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
} from './types';

//This is a function to get the current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
       const res = await axios.get('/profile/me');
       
       dispatch({
           type: GET_PROFILE,
           payload: res.data
       });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    try {
       const res = await axios.get('/profile');
       
       dispatch({
           type: GET_PROFILES,
           payload: res.data
       });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

export const getProfileById = userId => async dispatch => {
    
    try {
       const res = await axios.get(`/profile/user/${userId}`);
       
       dispatch({
           type: GET_PROFILE,
           payload: res.data
       });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
    }
}

//Action to create or update a profile

export const createProfile = (
    formData, 
    history, 
    edit = false) => async dispatch => {
        try {
            const config = {
                header: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.post('/profile', formData, config);

            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });

            dispatch(setAlert( edit ? 'Profile Updated' : 'Profile Created', 'success'));

            if (!edit) {
                history.push('/dashboard');
            }
        } catch (error) {

            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText,
                status: error.response.status }
            })
            
        }
    }

// adding experience

export const addBook = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/profile/books', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert( 'Book Added', 'success'));

        
        history.push('/dashboard');
        
    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
        
    }
}

// adding education

export const addAuthor = (formData, history) => async dispatch => {
    try {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/profile/authors', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert( 'Authors Added', 'success'));

        
        history.push('/dashboard');
        
    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText,
            status: error.response.status }
        })
        
    }
}

// Delete experience
export const deleteBook = id => async dispatch => {
    try {
        const res = await axios.delete(`/profile/books/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Book Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, 
                status: error.response.status}
        })
    }
}

// Delete education
export const deleteAuthor = id => async dispatch => {
    try {
        const res = await axios.delete(`/profile/authors/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Author Removed', 'success'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Delete account and Profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account?')) {

    try {
        const res = await axios.delete('/api/profile');

        dispatch({
            type: CLEAR_PROFILE,
        });

        dispatch({
            type: ACCOUNT_DELETED,
        });

        dispatch(setAlert('Account Permanently Removed'))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    }
}
};