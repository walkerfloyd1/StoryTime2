import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../../actions/profile';
import ProfileBio from './ProfileBio'
import ProfileSocials from './ProfileSocials';
import ProfileBooks from './ProfileBooks';
import ProfileAuthors from './ProfileAuthors';

const Profile = ({
    getProfileById, 
    match, 
    auth, 
    profile: { 
        profile, 
        loading 
    }
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Back to Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id
                     && (<Link to="/edit-profile" className="btn btn-dark">
                         Edit Profile
                     </Link>)}
                <div class="profile-grid my-1">
                    <ProfileSocials profile={profile}/>
                    <ProfileBio profile={profile}/>
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Favorite Books</h2>
                        {profile.books.length > 0 ? (
                            <Fragment>
                                {profile.books.map(book => (
                                    <ProfileBooks 
                                    key={book._id} 
                                    experience={book} />
                                ))}
                            </Fragment>
                        ) : (<h4>No Books</h4>)}
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Authors</h2>
                        {profile.authors.length > 0 ? (
                            <Fragment>
                                {profile.authors.map(author => (
                                    <ProfileAuthors
                                    key={author._id} 
                                    education={author} />
                                ))}
                            </Fragment>
                        ) : (<h4>No Authorss</h4>)}
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
