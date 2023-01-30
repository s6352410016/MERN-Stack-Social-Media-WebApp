const router = require('express').Router();
const signupControllers = require('../controllers/signupController');
const signinControllers = require('../controllers/signinController');
const otpControllers = require('../controllers/OTPController');

router.post('/checkUsername' , signupControllers.checkUsername);
router.post('/checkEmail' , signupControllers.checkEmail);
router.post('/signup' , signupControllers.signup);
router.post('/signin' , signinControllers.signin);
router.post('/sendOTP' , otpControllers.sendOTP);
router.post('/resendOTP' , otpControllers.resendOTP);
router.post('/verifyOTP' , otpControllers.verifyOTP);

module.exports = router;