const router = require('express').Router();
const signupControllers = require('../controllers/signupController');
const signinControllers = require('../controllers/signinController');
const otpControllers = require('../controllers/OTPController');
const authUserControllers = require('../controllers/authUserController');
const resetPasswordControllers = require('../controllers/resetPasswordController');
const postControllers = require('../controllers/postController');
const commentControllers = require('../controllers/commentController');
const shareControllers = require('../controllers/shareController');
const userControllers = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

const storage1 = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , path.join(__dirname , '../public/postImg'));
    },
    filename: (req , file , cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `post_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null , randomFileName);
    } 
});

const storage2 = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , path.join(__dirname , '../public/postVideo'));
    },
    filename: (req , file , cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `post_video_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null , randomFileName);
    } 
});

const storage3 = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null , path.join(__dirname , '../public/commentImg'));
    },
    filename: (req , file , cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `comment_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null , randomFileName);
    } 
});

const uploadWithImages = multer({storage: storage1});
const uploadWithVideo = multer({storage: storage2});
const commentUploadImage = multer({storage: storage3});

router.post('/checkUsername' , signupControllers.checkUsername);
router.post('/checkEmail' , signupControllers.checkEmail);
router.post('/signup' , signupControllers.signup);
router.post('/signin' , signinControllers.signin);
router.post('/sendOTP' , otpControllers.sendOTP);
router.post('/resendOTP' , otpControllers.resendOTP);
router.post('/verifyOTP' , otpControllers.verifyOTP);
router.post('/authUser' , authUserControllers.authUser);
router.put('/resetPassword' , resetPasswordControllers.resetPassword);
router.post('/createPostWithMsg' , postControllers.createPostWithMsg);
router.post('/createPostWithImages' , uploadWithImages.array('postImage') , postControllers.createPostWithImages);
router.post('/createPostWithVideo' , uploadWithVideo.single('postVideo') , postControllers.createPostWithVideo);
router.put('/updatePostWithImages' , uploadWithImages.array('postImage') , postControllers.updatePostWithImages);
router.put('/updatePostWithVideo' , uploadWithVideo.single('postVideo') , postControllers.updatePostWithVideo);
router.put('/updatePostWithMsg' , postControllers.updatePostWithMsg);
router.delete('/deletePost' , postControllers.deletePost);
router.put('/likeAndDislikePost' , postControllers.likeAndDislikePost);
router.post('/createComment' , commentUploadImage.single('commentImage') , commentControllers.createComment);
router.put('/updateCommentWithImage' , commentUploadImage.single('commentImage') , commentControllers.updateCommentWithImage);
router.put('/updateCommentWithMsgs' , commentControllers.updateCommentWithMsgs);
router.delete('/deleteComment' , commentControllers.deleteComment);
router.post('/createSharePost' , shareControllers.createSharePost);
router.put('/updateSharePost' , shareControllers.updateSharePost);
router.delete('/deleteSharePost' , shareControllers.deleteSharePost);
router.put('/sharePostLikeAndDislike' , shareControllers.sharePostLikeAndDislike);
router.post('/getAllSharePost' , shareControllers.getAllSharePost);
router.post('/getAllPosts' , postControllers.getAllPosts);
router.post('/getAllComments' , commentControllers.getAllComments);
router.put('/followAndUnFollow' , userControllers.followAndUnFollow);
router.post('/getAllUsers' , userControllers.getAllUsers);
router.post('/getUserByUserId' , userControllers.getUserByUserId);

module.exports = router;