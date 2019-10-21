import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../../actions/story.js';
import Spinner from '../layout/Spinner';
import StoryItem from './StoryItem';
import StoryForm from './StoryForm';

const Stories = ({ getPosts, 
    post: {
        posts,
        loading
    }
}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    return loading ? <Spinner /> : (
        <div>
            <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead">
                <i className="fas fa-user" />
            </p>
            <StoryForm />
            <div className="posts">
                {posts.map(post => (
                    <StoryItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
        </div>
    )
}

Stories.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Stories)
