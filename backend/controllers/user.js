const User = require('../models/user');
const Blog = require('../models/blog');

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
