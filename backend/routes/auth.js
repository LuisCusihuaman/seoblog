const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin } = require('../controllers/auth');

// validators
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators');
const { response } = require('express');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

// test
router.get('/secret', requireSignin, (req, res = response) => {
  return res.json({ user: req.user });
});

module.exports = router;
