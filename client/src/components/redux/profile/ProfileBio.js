import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileBio = ({
    profile: {
        bio
    }
}) => {
    return (
        <div class="profile-about bg-light p-2">
            {
                bio && (
                    <Fragment>
                        <h2 class="text-primary">Bio</h2>
          <p>
            {bio}
          </p>
          <div class="line"></div>
                    </Fragment>
                )
            }
        </div>
    )
}

ProfileBio.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileBio;
