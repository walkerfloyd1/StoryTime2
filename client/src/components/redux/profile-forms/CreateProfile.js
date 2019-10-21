import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const CreateProfile = ({
    createProfile,
    history
}) => {
    const [formData, setFormData] = useState({ 
        genres: '',
        bio: '',
        authors: '',
        books: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const {
        genres,
        bio,
        authors,
        books,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
      }

    return (
        <Fragment>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <small>* = required field</small>
      <form className="form"
      onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="genres" 
          value={genres}
          onChange={e => onChange(e)}>
            <option value="0">* Select Favorite Genre </option>
            <option value="Horror">Horror</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Mystery">Mystery</option>
          </select>
          <small className="form-text"
            >Tell us your favorite literary genres!</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" 
          name="bio"
          value={bio} 
          onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button 
          type="button" 
          className="btn btn-light"
          onClick={() => toggleSocialInputs(!displaySocialInputs)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && <Fragment>
            <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" 
          placeholder="Facebook URL" 
          name="facebook" 
          value={facebook} 
          onChange={e => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" 
          placeholder="YouTube URL" 
          name="youtube" 
          value={youtube} 
          onChange={e => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" 
          placeholder="Linkedin URL" 
          name="linkedin" 
          value={linkedin} 
          onChange={e => onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" 
          placeholder="Instagram URL" 
          name="instagram" 
          value={instagram} 
          onChange={e => onChange(e)}/>
        </div>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" 
          placeholder="Twitter URL" 
          name="twitter" 
          value={twitter} 
          onChange={e => onChange(e)}/>
        </div>
        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
      </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, { createProfile })(CreateProfile);
