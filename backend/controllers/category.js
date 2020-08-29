const Category = require('../models/category');
const slugify = require('slugify');

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  let category = new Category({ name, slug });
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }
    res.json(data);
  });
};
