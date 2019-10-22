import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBook } from '../../../actions/profile';

const Books = ({
    books,
    deleteBook
}) => {
    const bookslist = books.map(book => (
        <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.genre}</td>
            <td>{book.description}</td>
            <td>{book.authors}</td>
            <td>
                <button onClick={() => deleteBook(book._id)}className='btn btn-danger'> Delete Book </button>
            </td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">
                Books
            </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Genre</th>
                        <th className="hide-sm">Description</th>
                        <th className="hide-sm">Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {bookslist}
                </tbody>
            </table>
        </Fragment>
    )
}

Books.propTypes = {
    bookslist: PropTypes.array.isRequired,
    deleteBook: PropTypes.func.isRequired,
}

export default connect(null, { deleteBook })(Books);
