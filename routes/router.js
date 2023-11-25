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
const notificationControllers = require('../controllers/notificationController');
const chatControllers = require('../controllers/chatController');
const messageControllers = require('../controllers/messageController');
const replyControllers = require("../controllers/replyController");
const multer = require('multer');
const path = require('path');

const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/postImg'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `post_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/postVideo'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `post_video_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/commentImg'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `comment_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const storage4 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/userProfileImg'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `profile_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const storage5 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/userProfileBgImg'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `profile_bg_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const storage6 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/chatImg'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `chat_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const storage7 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/replyImg'));
    },
    filename: (req, file, cb) => {
        const fileExt = file.mimetype.split('/')[1];
        const randomFileName = `reply_img_${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        cb(null, randomFileName);
    }
});

const uploadWithImages = multer({ storage: storage1 });
const uploadWithVideo = multer({ storage: storage2 });
const commentUploadImage = multer({ storage: storage3 });
const uploadProfileImg = multer({ storage: storage4 });
const uploadProfileBgImg = multer({ storage: storage5 });
const uploadChatImg = multer({ storage: storage6 });
const uploadReplyImg = multer({ storage: storage7 });

router.post('/checkUsername', signupControllers.checkUsername);
router.post('/checkEmail', signupControllers.checkEmail);
router.post('/signup', signupControllers.signup);
router.post('/signin', signinControllers.signin);
router.post('/sendOTP', otpControllers.sendOTP);
router.post('/resendOTP', otpControllers.resendOTP);
router.post('/verifyOTP', otpControllers.verifyOTP);
router.post('/authUser', authUserControllers.authUser);
router.put('/resetPassword', resetPasswordControllers.resetPassword);
router.post('/createPostWithMsg', postControllers.createPostWithMsg);
router.post('/createPostWithImages', uploadWithImages.array('postImage'), postControllers.createPostWithImages);
router.post('/createPostWithVideo', uploadWithVideo.single('postVideo'), postControllers.createPostWithVideo);
router.put('/updatePostWithImages', uploadWithImages.array('postImage'), postControllers.updatePostWithImages);
router.put('/updatePostWithVideo', uploadWithVideo.single('postVideo'), postControllers.updatePostWithVideo);
router.put('/updatePostWithMsg', postControllers.updatePostWithMsg);
router.delete('/deletePost', postControllers.deletePost);
router.put('/likeAndDislikePost', postControllers.likeAndDislikePost);
router.post('/createComment', commentUploadImage.single('commentImage'), commentControllers.createComment);
router.put('/updateCommentWithImage', commentUploadImage.single('commentImage'), commentControllers.updateCommentWithImage);
router.put('/updateCommentWithMsgs', commentControllers.updateCommentWithMsgs);
router.delete('/deleteComment', commentControllers.deleteComment);
router.delete("/deleteCommentMsg", commentControllers.deleteCommentMsg);
router.post('/createSharePost', shareControllers.createSharePost);
router.put('/updateSharePost', shareControllers.updateSharePost);
router.delete('/deleteSharePost', shareControllers.deleteSharePost);
router.put('/sharePostLikeAndDislike', shareControllers.sharePostLikeAndDislike);
router.post('/getAllSharePost', shareControllers.getAllSharePost);
router.post('/getAllPosts', postControllers.getAllPosts);
router.post('/getAllComments', commentControllers.getAllComments);
router.post('/getAllReplys', replyControllers.getAllReplys);
router.post('/getCommentByPostId', commentControllers.getCommentByPostId);
router.post('/getAllSharePostByUserIdToShare/:id', shareControllers.getAllSharePostByUserIdToShare);
router.put('/followAndUnFollow', userControllers.followAndUnFollow);
router.post('/getAllUsers', userControllers.getAllUsers);
router.post('/getUserByUserId', userControllers.getUserByUserId);
router.post('/createNotification', notificationControllers.createNotification);
router.post('/getAllNotifications', notificationControllers.getAllNotification);
router.post('/getAllChats', chatControllers.getAllChats);
router.post('/getAllMessages', messageControllers.getAllMessages);
router.put('/updateUserToReadNotification', notificationControllers.updateUserToReadNotification);
router.put('/uploadProfileImg/:id', uploadProfileImg.single('profileImg'), userControllers.uploadProfileImg);
router.put('/uploadProfileBgImg/:id', uploadProfileBgImg.single('profileBgImg'), userControllers.uploadProfileBgImg);
router.put('/updateOtherDetailOfUserByUserId/:id', userControllers.updateOtherDetailOfUserByUserId);
router.post('/createChat', chatControllers.createChat);
router.post('/getAllChatByUserId/:userId', chatControllers.getAllChatByUserId);
router.post('/findChat/:senderId/:receiverId', chatControllers.findChat);
router.post('/createMessage', uploadChatImg.array('chatImg'), messageControllers.createMessage);
router.post('/getMessage', messageControllers.getMessage);
router.post('/getLastMessageByChatId', messageControllers.getLastMessageByChatId);
router.delete('/deleteMsgByChatId', messageControllers.deleteMsgByChatId);
router.post("/createReply", uploadReplyImg.single("replyImg"), replyControllers.createReply);
router.post("/getReplyByCommentId", replyControllers.getReplyByCommentId);
router.put("/updateReplyWithImage", uploadReplyImg.single("replyImg"), replyControllers.updateReplyWithImage);
router.put("/updateReplyWithMsg", uploadReplyImg.single("replyImg"), replyControllers.updateReplyWithMsg);
router.put("/updateReplyWithImageAndMsg", uploadReplyImg.single("replyImg"), replyControllers.updateReplyWithImageAndMsg);
router.delete("/deleteReply", replyControllers.deleteReply);
router.delete("/deleteReplyMsg", replyControllers.deleteReplyMsg);
router.put("/likeAndDislikeReply", replyControllers.likeAndDislikeReply);
router.put("/likeAndDislikeComment", commentControllers.likeAndDislikeComment);
router.delete("/deleteCurrentProfileImg", userControllers.deleteCurrentProfileImg);
router.delete("/deleteCurrentProfileBgImg", userControllers.deleteCurrentProfileBgImg);
router.post("/checkUserExistUpdateProfile" , userControllers.checkUserExistUpdateProfile);
router.post("/adminLogin" , signinControllers.adminLogin);
router.post("/blockUser" , userControllers.blockUser);

// router.delete('/deleteMessage', messageControllers.deleteMsg);

module.exports = router;