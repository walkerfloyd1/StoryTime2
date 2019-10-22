const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../middleware');
const { check, validationResult } = require("express-validator");

const Profile = require('../models/Profile');
const User = require('../models/User');
const Story = require('../models/Story');

router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

        if (!profile) {
            return res.status(400).json({ msg: "You don't have a profile"})
        }

        res.json(profile)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [ auth, [
    check('genres', 'Genres are required').not().isEmpty(),
]], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    console.log("Hit")

    const { 
        genres,
        bio,
        books,
        writers, 
        youtube, 
        facebook, 
        twitter, 
        instagram, 
        linkedin } = req.body;

    //Build Profile object

    const profileFields = {};
    profileFields.user = req.user.id;

    if (genres) {
        profileFields.genres = genres.split(',').map(genre => genre.trim());
    };

    if (bio) {
        profileFields.bio = bio;
    };

    if (books) {
        profileFields.books = books.split(',').map(book => book.trim());
    };

    console.log("hit authors");

    if (writerrs) {
        profileFields.writers = writers.split(',').map(writer => writer.trim());
        console.log("There is an authors profile field");
    };

    //build social fields 
    profileFields.social = {}
    if (youtube) {
        profileFields.social.youtube = youtube;
    };
    if (twitter) {
        profileFields.social.twitter = twitter;
    };
    if (facebook) {
        profileFields.social.facebook = facebook;
    };
    if (linkedin) {
        profileFields.social.linkedin = linkedin;
    };
    if (instagram) {
        profileFields.social.instagram = instagram;
    };


    try {
        let profile = await Profile.findOne({ user: req.user.id})

        console.log("hit");

        if (!profile) {
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);
        }

        else {
            console.log(req.user.id)
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true });
            console.log('profile hit');
            return res.json(profile)
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

    console.log(profileFields.skills);
})

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate({ model: 'user', path: 'user', select: ['name']});
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', 
        ['name']);

        if (!profile) 
            return res.status(400).json({ msg: "Profile Not Found!! "})
        ;
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Profile Not Found!!"})
        }
        res.status(500).send('Server Error')
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        await Story.deleteMany({ user: req.user.id});
        await Profile.findOneAndDelete({ user: req.user.id });
        await User.findOneAndDelete({ _id: req.user.id });
        res.json({ msg: "User deleted" });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.put('/writers', 
[ auth, 
    [
    check('name', 'Name is required').not().isEmpty(),
    check('books', 'Books are required').not().isEmpty(),
]
], 
async (req, res) => {
    const errors = validationResult(req);
   
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        name, 
        books, 
    } = req.body;

    const newAuth = {
        name, 
        books, 
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        profile.writers.unshift(newAuth);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.delete('/writers/:writer_id', auth, async (req, res) => {
    try {

        const foundProfile = await Profile.findOne({ user: req.user.id });
        const writerIds = foundProfile.writers.map(writer => writer._id.toString());

        console.log(writerIds);

        // GET remove index
        const removeIndex = writerIds.indexOf(req.params.writer_id);
        
        if (removeIndex === -1) {
            return res.status(500).json({ msg: "Server error" });
          } else {
 
            foundProfile.writers.splice(removeIndex, 1);
            await foundProfile.save();
            return res.status(200).json(foundProfile);
          }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}
);

router.put('/books', 
[ auth, 
    [
    check('title', 'Title is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('authors', 'Authors are required').not().isEmpty(),
]
], 
async (req, res) => {
    const errors = validationResult(req);
   
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title, 
        genre, 
        authors,
        description
    } = req.body;

    const newBook = {
        title, 
        genre, 
        authors, 
        description
    };

    console.log("Hit");

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        console.log(req.user.id);

        profile.books.unshift(newBook);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.delete('/books/:book_id', auth, async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id });
        const bookIds = foundProfile.books.map(book => book._id.toString());

        // GET remove index
        const removeIndex = bookIds.indexOf(req.params.book_id);
        
        if (removeIndex === -1) {
            return res.status(500).json({ msg: "Server error" });
          } else {

            foundProfile.books.splice(removeIndex, 1);
            await foundProfile.save();
            return res.status(200).json(foundProfile);
          }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}
);

module.exports = router;
