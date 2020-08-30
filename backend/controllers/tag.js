const Tag = require('../models/tag');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { response, request } = require('express');

exports.create = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();
  let tag = new Tag({ name, slug });
  tag.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(data);
  });
};

exports.list = (req, res = response) => {
  Tag.find().exec((error, tags) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(tags);
  });
};

exports.read = (req = request, res = response) => {
  const slug = req.params.slug.toLowerCase();
  Tag.findOne({ slug }).exec((error, tag) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json(tag);
  });
};

exports.remove = (req = request, res = response) => {
  const slug = req.params.slug.toLowerCase();
  Tag.findOneAndRemove({ slug }).exec((error) => {
    if (error) {
      return res.status(400).json({ error: errorHandler(error) });
    }
    res.json({ message: 'Tag deleted successfully' });
  });
};
