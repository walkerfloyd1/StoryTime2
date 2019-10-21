const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    genres: {
        type: [String]
    },
    social: {
        youtube: {
            type: String
        }, 
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);