import React from 'react'
import PropTypes from 'prop-types'

const ProfileBooks = ({
    books: {
        title,
        genre,
        authors,
        description
    } 
}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{authors}</p>
            <p>{genre}</p>
            <p>{description}</p>
        </div>
    )
}

ProfileBooks.propTypes = {
    books: PropTypes.array.isRequired,
}

export default ProfileBooks;