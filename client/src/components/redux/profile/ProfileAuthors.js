import React from 'react'
import PropTypes from 'prop-types'

const ProfileAuthors = ({
    authors: {
        name,
        books
    } 
}) => {
    return (
        <div>
            <h3>{name}</h3>
            <p>{books}</p>
        </div>
    )
}

ProfileAuthors.propTypes = {
    authors: PropTypes.array.isRequired,
}

export default ProfileAuthors;
