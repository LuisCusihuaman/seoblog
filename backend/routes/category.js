const express = require('express');
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { create } = require('../controllers/category');
const router = express.Router();

router.post('/category', categoryCreateValidator, requireSignin, adminMiddleware, create);

module.exports = router;
