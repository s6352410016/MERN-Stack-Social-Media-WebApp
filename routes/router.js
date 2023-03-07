const router = require('express').Router();
const signupControllers = require('../controllers/signupController');
const signinControllers = require('../controllers/signinController');
const otpControllers = require('../controllers/OTPController');
const authUserControllers = require('../controllers/authUserController');
const resetPasswordControllers = require('../controllers/resetPasswordController');
const postControllers = require('../controllers/postController');
const multer = require('multer');
const path = require('path');

const storage1 = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , path.join(__dirname , '../public/postImg'));
    },
    filename: (req , file , cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `post_img_${Date.now()}.${fileExt}`;
        cb(null , randomFileName);
    } 
});

const storage2 = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , path.join(__dirname , '../public/postVideo'));
    },
    filename: (req , file , cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `post_video_${Date.now()}.${fileExt}`;
        cb(null , randomFileName);
    } 
});

const uploadWithImages = multer({storage: storage1});
const uploadWithVideo = multer({storage: storage2});

router.post('/checkUsername' , signupControllers.checkUsername);
router.post('/checkEmail' , signupControllers.checkEmail);
router.post('/signup' , signupControllers.signup);
router.post('/signin' , signinControllers.signin);
router.post('/sendOTP' , otpControllers.sendOTP);
router.post('/resendOTP' , otpControllers.resendOTP);
router.post('/verifyOTP' , otpControllers.verifyOTP);
router.get('/authUser' , authUserControllers.authUser);
router.put('/resetPassword' , resetPasswordControllers.resetPassword);
router.post('/createPostWithImages' , uploadWithImages.array('postImage') , postControllers.createPostWithImages);
router.post('/createPostWithVideo' , uploadWithVideo.single('postVideo') , postControllers.createPostWithVideo);
router.put('/updatePostWithImages' , uploadWithImages.array('postImage') , postControllers.updatePostWithImages);
router.put('/updatePostWithVideo' , uploadWithVideo.single('postVideo') , postControllers.updatePostWithVideo);
router.put('/updatePostWithMsg' , postControllers.updatePostWithMsg);
router.delete('/deletePost' , postControllers.deletePost);

module.exports = router;