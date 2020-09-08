const User = require('../models/user');
const Blog = require('../models/blog');
const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};
exports.publicProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    user.photo = undefined;
    user.hashed_password = undefined;
    const blogs = await Blog.find({ postedBy: user._id })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name ')
      .limit(10)
      .select('_id title slug excerpt categories tags postedBy createdAt updatedAt');
    return res.json({ user, blogs });
  } catch (error) {
    const { message } = error;
    const status = error.statusCode || 500;
    return res.status(status).json({ error: message });
  }
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'Photo could not be uploaded' });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({ error: 'Image shoud be less than 1mb' });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      user.hashed_password = undefined;
      res.json(user);
    });
  });
};

exports.photo = async (req, res) => {
  const { username } = req.params;
  try {
    const user = User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (user.photo.data) {
      res.set('Content-Type', user.photo.contentType);
      return res.send(user.photo.data);
    }
  } catch (error) {
    return res.json(error);
  }
};
