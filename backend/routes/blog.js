const express = require('express');
const router = express.Router();
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create, list } = require('../controllers/blog');

router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);

module.exports = router;
