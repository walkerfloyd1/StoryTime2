import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteWriter } from '../../../actions/profile';

const Authors = ({ 
    authors, 
    deleteAuthor
 }) => {
    const authorlist = authors.map(author => (
        <tr key={author._id}>
            <td>{author.name}</td>
            <td>{author.books}</td>
            <td>
                <button onClick={() => deleteAuthor(author._id)}className='btn btn-danger'> Delete Author </button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">
                Authors
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th className="hide-sm">Name</th>
                        <th className="hide-sm">Books</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {authorlist}
                </tbody>
            </table>
        </Fragment>
    )
}

Authors.propTypes = {
    authors: PropTypes.array.isRequired,
    deleteWriter: PropTypes.func.isRequired,
}

export default connect(null, { deleteWriter })(Authors);
