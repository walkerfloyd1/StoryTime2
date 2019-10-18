const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    title: {
      type: String
    },
    genre: {
      type: String
    },
    text: {
      type: String
    },
    likes: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }],
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      }
    }],
    date: {
      type: Date,
      default: Date.now
  }
})

module.exports = Story = mongoose.model("story", storySchema);


