const Category = require('../models/category');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { response, request } = require('express');

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  let category = new Category({ name, slug });
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(data);
  });
};

exports.list = (req, res = response) => {
  Category.find().exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(categories);
  });
};

exports.read = (req = request, res = response) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOne({ slug }).exec((error, category) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(category);
  });
};

exports.remove = (req = request, res = response) => {
  const slug = req.params.slug.toLowerCase();
  Category.findOneAndRemove({ slug }).exec((error) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json({ message: 'Category deleted successfully' });
  });
};
