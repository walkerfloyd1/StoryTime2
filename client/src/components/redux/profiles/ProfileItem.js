import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ProfileItem = ({ profile: {
    user: {
        _id, 
        name
    },
    genres,
}}) => {
    return (
        <div className="profile bg-light">
            <div>
                <h2>{name}</h2>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {genres.slice(0, 4).map((genre, index) => (
                    <li key={index} className="text primary">
                        <i className="fas fa-check" /> {genre}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem;
