const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Story = require('../models/Story');
const User = require('../models/User');

router.post('/', [ auth, [
  check('text').not().isEmpty()
] ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }

  try {
      const user = await User.findById(req.user.id).select('-password');

  const newStory = new Story({
      text: req.body.text,
      name: user.name,
      user: req.user.id
  });

  const story = await newStory.save();

  res.json(story);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }

  
});

// GET api/posts
// desc Get all posts
// access Private

// would like to sort by popularity

router.get('/', auth, async (req, res) => {
  try {
      const stories = await Story.find().sort({ date: -1 });
      res.json(stories);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }
});

// GET api/posts/:id
// desc Get post by ID
// access Private

router.get('/:id', auth, async (req, res) => {
  try {
      const story = await Story.findById(req.params.id);

      if (!story) {
          return res.status(404).json({msg: 'Story not found'})
      }
      res.json(story);
  } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
          return res.status(404).json({msg: 'Story not found'})
      }
      res.status(500).send('Server Error')
  }
});

// DELETE api/posts/:id
// desc Delete a post
// access Private

router.delete('/:id', auth, async (req, res) => {
  try {
      const story = await Story.findById(req.params.id);

      if (!story) {
          return res.status(404).json({msg: 'Story not found'})
      }

      if(story.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'User not authorized'})
      }

      await story.remove()
      
      res.json({ msg: 'Story Removed'});
  } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
          return res.status(404).json({msg: 'Post not found'})
      }
      res.status(500).send('Server Error')
  }
});

// PUT api/posts/like/:id
// desc Like a post
// access Private

router.put('/like/:id', auth, async (req, res) => {
  try {
      const story = await Story.findById(req.params.id);

      if (story.likes.filter(like => 
          like.user.toString() === req.user.id
      ).length > 0) {
          return res.status(400).json({ msg: 'Story already liked'})
      }

      story.likes.unshift({ user: req.user.id})

      await story.save();

      res.json(story.likes);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }
})

// PUT api/posts/unlike/:id
// desc Like a post
// access Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
      const story = await Story.findById(req.params.id);

      if (story.likes.filter(like => 
          like.user.toString() === req.user.id
      ).length === 0) {
          return res.status(400).json({ msg: 'Story has not been liked'})
      }

      // Get remove index

      const removeIndex = story.likes.map(like => {
          like.user.toString()
      }).indexOf(req.user.id);

      story.likes.splice(removeIndex, 1);

      await story.save();

      res.json(story.likes);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }
});

// POST api/posts/comment/:id
// Comment on a post
// @access Private
router.post('/comment/:id', 
[ 
  auth, [
  check('text').not().isEmpty()
  ] 
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }

  try {
  
  const user = await User.findById(req.user.id).select('-password');

  const story = await Story.findById(req.params.id);


  const newComment = new Story({
      text: req.body.text,
      name: user.name,
      user: req.user.id
  });

  story.comments.unshift(newComment);

  await story.save();

  res.json(story.comments);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }

  
});

// DELETE api/posts/comment/:id/:comment_id
// Delete a comment on a post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
      const story = await Story.findById(req.params.id);

      const comment = story.comments.find(comment => comment.id === req.params.comment_id);

      if (!comment ) {
          return res.status(404).json({ msg: 'No comment'})
      }

      if (comment.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Unauthorized'})
      }

      const removeIndex = story.comments.map(comment => {
          comment.user.toString()
      }).indexOf(req.user.id);

      story.comments.splice(removeIndex, 1);

      await story.save();

      res.json(story.comments);


  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error')
  }
})

module.exports = router;
