const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin, forgotPassword } = require('../controllers/auth');

// validators
const {
  userSignupValidator,
  userSigninValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require('../validators/auth');
const { runValidation } = require('../validators');
const { response } = require('express');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
// router.put('/reset-password', resetPasswordValidator, runValidation,resetPassword);

module.exports = router;
