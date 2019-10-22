import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAuthor } from '../../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddAuthors = ({ addAuthor, history}) => {
    const [formData, setFormData] = useState({
        name: '',
        books: '',
    });

    const {
        name,
        books,
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    return (
        <Fragment>
            <h1 className="large text-primary">
       Add An Author
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any author
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={
          e => {
              e.preventDefault();
              addAuthor(formData, history);
          }
      }>
        <div className="form-group">
          <input type="text"
           placeholder="Name"
            name="name" 
            required 
            value={name}
            onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" 
          placeholder="* books" 
          name="books" 
          value={books} 
          onChange={e => onChange(e)}/>
          <small className="form-text"
            >Separate each book by commas</small
          >
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to="/stories">Go to Stories</Link>
      </form>
        </Fragment>
    )
}

AddAuthors.propTypes = {
    addAuthor: PropTypes.func.isRequired,
}

export default connect(null, { addAuthor })(withRouter(AddAuthors));