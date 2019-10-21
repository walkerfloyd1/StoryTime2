import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import { getProfiles } from '../../../actions/profile';


const Profiles = ({ 
    getProfiles, 
    profile: { 
        profiles, 
        loading 
    } 
}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <div>
            <Fragment>
            { loading ? ( <Spinner /> ) : ( <Fragment>
                <h1 className="large text-primary">
                    Authors
                </h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop" /> Find some authors that you love!
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : (<h4>No Profiles...</h4>)}
                </div>
                </Fragment> )}
            </Fragment>
        </div>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps= state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
