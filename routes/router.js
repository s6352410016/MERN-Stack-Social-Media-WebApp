const router = require('express').Router();
const signupControllers = require('../controllers/signupController');
const signinControllers = require('../controllers/signinController');
const otpControllers = require('../controllers/OTPController');
const authUserControllers = require('../controllers/authUserController');
const resetPasswordControllers = require('../controllers/resetPasswordController');

router.post('/checkUsername' , signupControllers.checkUsername);
router.post('/checkEmail' , signupControllers.checkEmail);
router.post('/signup' , signupControllers.signup);
router.post('/signin' , signinControllers.signin);
router.post('/sendOTP' , otpControllers.sendOTP);
router.post('/resendOTP' , otpControllers.resendOTP);
router.post('/verifyOTP' , otpControllers.verifyOTP);
router.get('/authUser' , authUserControllers.authUser);
router.put('/resetPassword' , resetPasswordControllers.resetPassword);

module.exports = router;