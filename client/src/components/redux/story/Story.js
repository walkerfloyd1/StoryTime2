import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import StoryItem from '../stories/StoryItem';
import AddToStory from './AddToStory';
import AddToStoryItem from './AddTostoryItem';
import { getPost } from '../../../actions/stories';

const Story = ({
    getPost,
    post: {
        post,
        loading
    }, match
}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost])
    return loading || post === null ? <Spinner /> : (
        <Fragment>
            <Link to='/stories' className='btn'>
                Back to Stories
            </Link>
            <StoryItem post={post} showActions={false} />
            <AddToStory postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <AddToStoryItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    )
}

Story.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})


export default connect(mapStateToProps, { getPost })(Story);
