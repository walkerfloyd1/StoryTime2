import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBook } from '../../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddBooks = ({ addBook, history}) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        authors: '',
        description: ''
    });

    const {
        title,
        genre,
        authors,
        description
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    return (
        <Fragment>
            <h1 className="large text-primary">
       Add A Book
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any book
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={
          e => {
              e.preventDefault();
              addBook(formData, history);
          }
      }>
        <div className="form-group">
          <input type="text"
           placeholder="* Job Title"
            name="title" 
            required 
            value={title}
            onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <select name="genres" 
          value={genre}
          onChange={e => onChange(e)}>
            <option value="Horror">Horror</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Romance">Romance</option>
            <option value="Mystery">Mystery</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" 
          placeholder="* authors" 
          name="authors" 
          value={authors} 
          onChange={e => onChange(e)}/>
          <small className="form-text"
            >If there are more than one author, please separate each author by commas</small
          >
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/stories">Go to Stories</Link>
      </form>
        </Fragment>
    )
}

AddBooks.propTypes = {
    addBook: PropTypes.func.isRequired,
}

export default connect(null, { addBook })(withRouter(AddBooks));
