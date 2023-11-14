import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare, faTrash, faCircleXmark, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TbMessageCircle2 } from "react-icons/tb";
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import EmojiPicker from 'emoji-picker-react';
import PeopleLikedYourPost from './PeopleLikedYourPost';
import Comment from './Comment';
import { RotatingLines } from 'react-loader-spinner';
import { SocketIOContext } from './SocketContext';
import { format } from 'date-fns';

const Post = ({ setSortAllPostAscending, setOpenProfileStatus, showProfilePageStatus, setShowProfilePageStatus, setCreateSharePostStatus, createSharePostStatus, followAndUnFollow, setFollowAndUnFollow, userDataInActive, likedPost, setLikedPost, editPostStatus, setEditPostStatus, deletePostStatus, setDeletePostStatus, userInfo, activeUserId, postId, userIdToPost, postMsg, postImgs, postVideo, createdAt, postLikes }) => {
    const { socket } = useContext(SocketIOContext);

    const selectFileIconRef = useRef();
    const inputCommentRef = useRef();
    const inputInSharePostRef = useRef();
    const inputInEditPostRef = useRef();
    const inputFileImgsInEditPostRef = useRef();
    const inputFileVideoInEditPostRef = useRef();

    const [settingInPostPopup, setSettingInPostPopup] = useState(false);
    const [openEmojiPickerInComment, setOpenEmojiPickerInComment] = useState(false);
    const [commetMsg, setCommentMsg] = useState('');
    const [cursorPosition, setCursorPosition] = useState();
    const [previewImgFile, setPreviewImgFile] = useState('');
    const [openPreviewImg, setOpenImgPreview] = useState(false);
    const [openPeopleLikedYourPost, setOpenPeopleLikeYourPost] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [openSharePostPopup, setOpenSharePostPopup] = useState(false);
    const [openEmojiPickerInSharePost, setOpenEmojiPickerInSharePost] = useState(false);
    const [msgInSharePost, setMsgInSharePost] = useState('');
    const [inputMsgInSharePostCursorPosition, setInputMsgInSharePostCursorPosition] = useState();
    const [openEditPostPopup, setOpenEditPostPopup] = useState(false);
    const [openEmojiPickerInEditPost, setOpenEmojiPickerInEditPost] = useState(false);
    const [msgInEditPost, setMsgInEditPost] = useState('');
    const [inputInEditPostCursorPosition, setInputInEditPostCursorPosition] = useState();
    const [clearImgsInEditPost, setClearImgsInEditPost] = useState(true);
    const [fileImgsInEditPost, setFileImgsInEditPost] = useState([]);
    const [fileVideoInEditPost, setFileVideoInEditPost] = useState(null);
    const [openVideoInEditPost, setOpenVideoInEditPost] = useState(true);
    const [showImgsInEditPost, setShowImgsInEditPost] = useState(true);
    const [showVideoInEditPost, setShowVideoInEditPost] = useState(true);
    const [openDeletePostPopup, setOpenDeletePostPopup] = useState(false);
    const [effectWhileEditPost, setEffectWhileEditPost] = useState(false);
    const [effectWhileDeletePost, setEffectWhileDeletePost] = useState(false);
    const [effectWhileSharePost, setEffectWhileSharePost] = useState(false);
    const [deleteCurrentPostImage, setDeleteCurrentPostImage] = useState(false);
    const [deleteCurrentPostVideo, setDeleteCurrentPostVideo] = useState(false);
    const [createCommentStatus, setCreateCommentStatus] = useState(false);
    const [editCommentStatus, setEditCommentStatus] = useState(false);
    const [deleteCommentStatus, setDeleteCommentStatus] = useState(false);
    const [disableEditPostButton, setDisableEditPostButton] = useState(true);
    const [DataOfUserByUserId, setDataOfUserByUserId] = useState({});
    const [dataOfUserActiveByUserId, setDataOfUserActiveByUserId] = useState({});
    const [selectFileImgToEditPost, setSelectFileImgToEditPost] = useState([]);
    const [selectFileImgToComment, setSelectFileImgToComment] = useState();
    const [commentOfUsers, setCommentOfUsers] = useState([]);
    const [likeCommentStatus, setLikeCommentStatus] = useState(false);

    const saveEditPost = () => {
        setEffectWhileEditPost(true);
        const formData = new FormData();

        if (msgInEditPost.trim() !== "" && selectFileImgToEditPost.length === 0 && fileVideoInEditPost === null) {
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updatePostWithMsg`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postId,
                    postMsg: msgInEditPost.trim(),
                    deleteCurrentPostImage: deleteCurrentPostImage,
                    deleteCurrentPostVideo: deleteCurrentPostVideo,
                })
            }).then((res) => {
                if (res.status === 200) {
                    if (deleteCurrentPostImage) {
                        setSortAllPostAscending((prev) => {
                            return prev.map((post) => {
                                if (post?._id === postId) {
                                    post.postImgs = [];
                                }
                                return post;
                            })
                        });
                        setDeleteCurrentPostImage(false);
                    }
                    if (deleteCurrentPostVideo) {
                        setSortAllPostAscending((prev) => {
                            return prev.map((post) => {
                                if (post?._id === postId) {
                                    post.postVideo = "";
                                }
                                return post;
                            })
                        });
                        setDeleteCurrentPostVideo(false);
                    }
                    setOpenEditPostPopup(false);
                    socket.current?.emit('postTransaction');
                    setMsgInEditPost("");
                    setEffectWhileEditPost(false);
                    setEditPostStatus(!editPostStatus);
                }
            });
            return;
        }
        if (msgInEditPost.trim() === "" && selectFileImgToEditPost.length !== 0 && fileVideoInEditPost === null) {
            formData.append('postId', postId);
            formData.append('postMsg', msgInEditPost.trim());
            selectFileImgToEditPost?.map((file) => {
                formData.append('postImage', file);
            });
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updatePostWithImages`, {
                method: 'PUT',
                body: formData
            }).then((res) => {
                if (res.status === 200) {
                    setSortAllPostAscending((prev) => {
                        return prev.map((post) => {
                            if (post?._id === postId) {
                                post.postImgs = [];
                            }
                            return post;
                        })
                    });
                    setDeleteCurrentPostImage(false);
                    setDeleteCurrentPostVideo(false);
                    setOpenEditPostPopup(false);
                    socket.current?.emit('postTransaction');
                    setFileImgsInEditPost([]);
                    setSelectFileImgToEditPost([]);
                    setEffectWhileEditPost(false);
                    setEditPostStatus(!editPostStatus);
                }
            });
            return;
        }
        if (msgInEditPost.trim() !== "" && selectFileImgToEditPost.length !== 0 && fileVideoInEditPost === null) {
            formData.append('postId', postId);
            formData.append('postMsg', msgInEditPost.trim());
            selectFileImgToEditPost?.map((file) => {
                formData.append('postImage', file);
            });
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updatePostWithImages`, {
                method: 'PUT',
                body: formData
            }).then((res) => {
                if (res.status === 200) {
                    setSortAllPostAscending((prev) => {
                        return prev.map((post) => {
                            if (post?._id === postId) {
                                post.postImgs = [];
                            }
                            return post;
                        })
                    });
                    setDeleteCurrentPostImage(false);
                    setDeleteCurrentPostVideo(false);
                    setOpenEditPostPopup(false);
                    socket.current?.emit('postTransaction');
                    setMsgInEditPost("");
                    setFileImgsInEditPost([]);
                    setSelectFileImgToEditPost([]);
                    setEffectWhileEditPost(false);
                    setEditPostStatus(!editPostStatus);
                }
            });
            return;
        }
        if (msgInEditPost.trim() === "" && selectFileImgToEditPost.length === 0 && fileVideoInEditPost !== null) {
            formData.append('postId', postId);
            formData.append('postMsg', msgInEditPost.trim());
            formData.append('postVideo', fileVideoInEditPost);
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updatePostWithVideo`, {
                method: 'PUT',
                body: formData
            }).then((res) => {
                if (res.status === 200) {
                    setSortAllPostAscending((prev) => {
                        return prev.map((post) => {
                            if (post?._id === postId) {
                                post.postVideo = "";
                            }
                            return post;
                        })
                    });
                    setDeleteCurrentPostImage(false);
                    setDeleteCurrentPostVideo(false);
                    setOpenEditPostPopup(false);
                    socket.current?.emit('postTransaction');
                    setMsgInEditPost("");
                    setFileVideoInEditPost(null);
                    setEffectWhileEditPost(false);
                    setEditPostStatus(!editPostStatus);
                }
            });
            return;
        }
        if (msgInEditPost.trim() !== "" && selectFileImgToEditPost.length === 0 && fileVideoInEditPost !== null) {
            formData.append('postId', postId);
            formData.append('postMsg', msgInEditPost.trim());
            formData.append('postVideo', fileVideoInEditPost);
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updatePostWithVideo`, {
                method: 'PUT',
                body: formData
            }).then((res) => {
                if (res.status === 200) {
                    setSortAllPostAscending((prev) => {
                        return prev.map((post) => {
                            if (post?._id === postId) {
                                post.postVideo = "";
                            }
                            return post;
                        })
                    });
                    setDeleteCurrentPostImage(false);
                    setDeleteCurrentPostVideo(false);
                    setOpenEditPostPopup(false);
                    socket.current?.emit('postTransaction');
                    setMsgInEditPost("");
                    setFileVideoInEditPost(null);
                    setEffectWhileEditPost(false);
                    setEditPostStatus(!editPostStatus);
                }
            });
            return;
        }
    }

    const deletePost = () => {
        setEffectWhileDeletePost(true);
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deletePost`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId
            })
        }).then((res) => {
            if (res.status === 200) {
                socket.current?.emit('created');
                setEffectWhileDeletePost(false);
                setDeletePostStatus(!deletePostStatus);
                setOpenDeletePostPopup(false);
            }
        });
    }

    const likePost = () => {
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/likeAndDislikePost`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                userId: activeUserId,
                userIdToPost: userIdToPost,
            })
        }).then((res) => {
            if (res.status === 200) {
                socket.current?.emit('created');
                setLikedPost(!likedPost);
            }
        });
    }

    const createComment = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!!commetMsg.trim() && !selectFileImgToComment) {
            formData.append('postIdToComment', postId);
            formData.append('userIdToComment', activeUserId);
            formData.append('commentMsgs', commetMsg);
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createComment`, {
                method: 'POST',
                body: formData
            }).then((res) => {
                if (res.status === 201) {
                    setCommentMsg('');
                    setSelectFileImgToComment();
                    setOpenImgPreview(false);
                    setOpenComments(true);
                    setCreateCommentStatus(!createCommentStatus);
                    inputCommentRef.current.blur();
                    return res.json();
                }
            }).then(async (res) => {
                if (userIdToPost !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: postId,
                            notificationOfCommentId: res.commentId,
                            notificationDetail: 'Comment your post',
                            notificationOfReceiverId: [userIdToPost]
                        })
                    });
                    if (response.status === 201) {
                        return socket.current?.emit('created');
                    }
                }
                socket.current?.emit('created');
            });
        }
        if (!commetMsg.trim() && !!selectFileImgToComment) {
            formData.append('postIdToComment', postId);
            formData.append('userIdToComment', activeUserId);
            formData.append('commentMsgs', commetMsg);
            formData.append('commentImage', selectFileImgToComment);
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createComment`, {
                method: 'POST',
                body: formData
            }).then((res) => {
                if (res.status === 201) {
                    setCommentMsg('');
                    setSelectFileImgToComment();
                    setOpenImgPreview(false);
                    setOpenComments(true);
                    setCreateCommentStatus(!createCommentStatus);
                    inputCommentRef.current.blur();
                    return res.json();
                }
            }).then(async (res) => {
                if (userIdToPost !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: postId,
                            notificationOfCommentId: res.commentId,
                            notificationDetail: 'Comment your post',
                            notificationOfReceiverId: [userIdToPost]
                        })
                    });
                    if (response.status === 201) {
                        return socket.current?.emit('created');
                    }
                }
                socket.current?.emit('created');
            });
        }
        if (!!commetMsg.trim() && !!selectFileImgToComment) {
            formData.append('postIdToComment', postId);
            formData.append('userIdToComment', activeUserId);
            formData.append('commentMsgs', commetMsg);
            formData.append('commentImage', selectFileImgToComment);
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createComment`, {
                method: 'POST',
                body: formData
            }).then((res) => {
                if (res.status === 201) {
                    setCommentMsg('');
                    setSelectFileImgToComment();
                    setOpenImgPreview(false);
                    setOpenComments(true);
                    setCreateCommentStatus(!createCommentStatus);
                    inputCommentRef.current.blur();
                    return res.json();
                }
            }).then(async (res) => {
                if (userIdToPost !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: postId,
                            notificationOfCommentId: res.commentId,
                            notificationDetail: 'Comment your post',
                            notificationOfReceiverId: [userIdToPost]
                        })
                    });
                    if (response.status === 201) {
                        return socket.current?.emit('created');
                    }
                }
                socket.current?.emit('created');
            });
        }
    }

    const sharePost = async () => {
        try {
            setEffectWhileSharePost(true);
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createSharePost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postIdToShare: postId,
                    userIdToShare: activeUserId,
                    shareMsg: msgInSharePost.trim(),
                })
            });
            if (res.status === 201) {
                const sharePostData = await res.json();
                setEffectWhileSharePost(false);
                setCreateSharePostStatus(!createSharePostStatus);
                setOpenSharePostPopup(false);
                if (userIdToPost !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: sharePostData?._id,
                            notificationDetail: 'Share your post',
                            notificationOfReceiverId: [userIdToPost]
                        })
                    });
                    if (response.status === 201) {
                        return socket.current?.emit('created');
                    }
                }
                socket.current?.emit('created');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const EmojiClickInCreateComment = ({ emoji }) => {
        inputCommentRef.current.focus();
        const start = commetMsg.substring(0, inputCommentRef.current.selectionStart);
        const end = commetMsg.substring(inputCommentRef.current.selectionStart);
        const msg = start + emoji + end;
        setCommentMsg(msg);
        setCursorPosition(start.length + emoji.length);
    }

    const EmojiClickInSharePost = ({ emoji }) => {
        inputInSharePostRef.current.focus();
        const start = msgInSharePost.substring(0, inputInSharePostRef.current.selectionStart);
        const end = msgInSharePost.substring(inputInSharePostRef.current.selectionStart);
        const msg = start + emoji + end;
        setMsgInSharePost(msg);
        setInputMsgInSharePostCursorPosition(start.length + emoji.length);
    }

    const EmojiClickInEditPost = ({ emoji }) => {
        inputInEditPostRef.current.focus();
        const start = msgInEditPost.substring(0, inputInEditPostRef.current.selectionStart);
        const end = msgInEditPost.substring(inputInEditPostRef.current.selectionStart);
        const msg = start + emoji + end;
        setMsgInEditPost(msg);
        setInputInEditPostCursorPosition(start.length + emoji.length);
    }

    const selectFileToUploadInComment = (e) => {
        if (e.target.files.length > 0) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPreviewImgFile(imgUrl);
            setSelectFileImgToComment(e.target.files[0]);
            setOpenImgPreview(true);
            inputCommentRef?.current?.focus();
        }
    }

    const selectFileImgsToUploadInEditPost = (e) => {
        if (e.target.files.length > 0) {
            const files = e.target.files;
            const arrFiles = Array.from(files);
            const imgsUrl = arrFiles.map((e) => URL.createObjectURL(e));
            setFileImgsInEditPost(imgsUrl);
            setSelectFileImgToEditPost(arrFiles);
            setClearImgsInEditPost(true);
            setFileVideoInEditPost(null);
            setShowVideoInEditPost(false);
        }
    }

    const selectFileVideoToUploadInEditPost = (e) => {
        const file = e.target.files;
        if (file.length > 0) {
            setFileVideoInEditPost(file[0]);
            setFileImgsInEditPost([]);
            setSelectFileImgToEditPost([]);
            setShowImgsInEditPost(false);
            setShowVideoInEditPost(false);
        }
    }

    const openWindowFileImgUpload = () => {
        inputFileImgsInEditPostRef.current.click();
    }

    const openWindowFileVideoUpload = () => {
        inputFileVideoInEditPostRef.current.click();
    }

    const focusInputComment = () => {
        inputCommentRef.current.focus();
    }

    const openPostEditPopup = () => {
        setSettingInPostPopup(false);
        setOpenEditPostPopup(!openEditPostPopup);
        setOpenVideoInEditPost(true);
        setShowImgsInEditPost(true);
        setShowVideoInEditPost(true);
    }

    const openPostDeletePopup = () => {
        setSettingInPostPopup(false);
        setOpenDeletePostPopup(true);
    }

    const openProfilePage = () => {
        setShowProfilePageStatus(!showProfilePageStatus);
    }

    const clearFileToSelect = () => {
        setPreviewImgFile('');
        setSelectFileImgToComment();
        setOpenImgPreview(false);
    }

    const clearFileImgsInEditPost = () => {
        setClearImgsInEditPost(false);
        setDeleteCurrentPostImage(true);
        setFileImgsInEditPost([]);
        setSelectFileImgToEditPost([]);
    }

    const closeSharePostPopup = () => {
        setOpenSharePostPopup(false);
        setOpenEmojiPickerInSharePost(false);
        setMsgInSharePost('');
    }

    const closeEditPostPopup = () => {
        setOpenEditPostPopup(false);
        setOpenEmojiPickerInEditPost(false);
        setFileImgsInEditPost([]);
        setFileVideoInEditPost('');
    }

    const closeEditPostPopupWithIconXmark = () => {
        setDeleteCurrentPostImage(false);
        setDeleteCurrentPostVideo(false);
        setOpenEmojiPickerInEditPost(false);
        setOpenEditPostPopup(false)
        setMsgInEditPost("");
        setFileImgsInEditPost([]);
        setSelectFileImgToEditPost([]);
        setFileVideoInEditPost(null);
    }

    const closeOpenVideoInEditPost = () => {
        setFileVideoInEditPost(null);
        setDeleteCurrentPostVideo(true);
        setOpenVideoInEditPost(false);
    }

    useEffect(() => {
        socket.current?.on('notificationServerEmit', () => {
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getCommentByPostId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postId,
                })
            }).then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then((res) => {
                // const sortedComment = res?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCommentOfUsers(res);
            });
        });
    }, []);

    useEffect(() => {
        socket.current?.on('commentTransactionServerEmit', () => {
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getCommentByPostId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postId,
                })
            }).then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then((res) => {
                // const sortedComment = res?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCommentOfUsers(res);
            });
        });
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getCommentByPostId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
            })
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((res) => {
            // const sortedComment = res?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setCommentOfUsers(res);
        });
    }, []);

    useEffect(() => {
        if (selectFileImgToEditPost?.length !== 0 || !!fileVideoInEditPost || !!msgInEditPost.trim()) {
            setDisableEditPostButton(false);
        } else {
            setDisableEditPostButton(true);
        }
    }, [msgInEditPost, selectFileImgToEditPost, fileVideoInEditPost]);

    useEffect(() => {
        if (openSharePostPopup) {
            inputInSharePostRef.current.focus();
        }
    });

    useEffect(() => {
        if (openEditPostPopup) {
            const length = inputInEditPostRef.current.value.length;
            inputInEditPostRef.current.focus();
            inputInEditPostRef.current.setSelectionRange(length, length);
        }
    }, [openEditPostPopup]);

    useEffect(() => {
        inputCommentRef.current.selectionEnd = cursorPosition;

        if (openSharePostPopup) {
            inputInSharePostRef.current.selectionEnd = inputMsgInSharePostCursorPosition;
        }

        if (openEditPostPopup) {
            inputInEditPostRef.current.selectionEnd = inputInEditPostCursorPosition;
        }

    }, [cursorPosition, inputMsgInSharePostCursorPosition, inputInEditPostCursorPosition]);

    useEffect(() => {
        if (openEditPostPopup) {
            setMsgInEditPost(postMsg);
            setClearImgsInEditPost(true);
        }
    }, [openEditPostPopup]);

    useEffect(() => {
        if (userIdToPost) {
            setDataOfUserByUserId(userInfo.find((e) => e._id === userIdToPost));
        }
    });

    useEffect(() => {
        if (activeUserId) {
            setDataOfUserActiveByUserId(userInfo.find((e) => e._id === activeUserId));
        }
    }, []);

    return (
        <div className='container-post-of-users'>
            <div className='content-header-in-post-of-users'>
                <Link to={`/profile/${DataOfUserByUserId._id}`} className='link-container-of-img'>
                    <div className='container-of-img-profile-users'>
                        <div className='container-width-full-img'>
                            <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!DataOfUserByUserId.profilePicture ? 'profileImgDefault.jpg' : DataOfUserByUserId.profilePicture}`} alt='profileImg' />
                        </div>
                    </div>
                </Link>
                <div className='content-center-in-header-in-post-of-users'>
                    <Link to={`/profile/${DataOfUserByUserId._id}`} className='link-in-container-of-fullname-user'><p className='fullname-of-post-users'>{DataOfUserByUserId.firstname} {DataOfUserByUserId.lastname}</p></Link>
                    <p className='modify-date-post-of-users'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
                </div>
                <div className='icon-settings-post-of-users'>
                    {activeUserId === DataOfUserByUserId._id
                        ?
                        <div className='container-icon-three-dots' onClick={() => setSettingInPostPopup(!settingInPostPopup)} >
                            <FontAwesomeIcon icon={faEllipsis} className='icon-three-dots-horizontal' />
                        </div>
                        :
                        <></>
                    }
                    {settingInPostPopup &&
                        <>
                            <div className='bg-toggle-onclick-in-tree-dots' onClick={() => setSettingInPostPopup(false)}></div>
                            <div className='setting-post-popup'>
                                <div className='icon-edit-post' onClick={openPostEditPopup}>
                                    <FontAwesomeIcon className='icon-edit-post-style' icon={faPenToSquare} />&nbsp;&nbsp;<span className='span-in-post-style'>Edit post</span>
                                </div>
                                <div className='icon-delete-post' onClick={openPostDeletePopup}>
                                    <FontAwesomeIcon className='icon-delete-post-style' icon={faTrash} />&nbsp;&nbsp;<span className='span-in-post-style'>Delete post</span>
                                </div>
                            </div>
                        </>
                    }
                    {openDeletePostPopup &&
                        <div className='container-delete-post-in-icon-settings-post-of-users'>
                            <div className='bg-onclick-to-close-delete-post-popup-in-icon-settings-post-of-users'></div>
                            <div className='container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                <div className='container-header-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                    <p>Are you sure to delete a post?</p>
                                </div>
                                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                <div className='container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                    <div onClick={() => setOpenDeletePostPopup(false)} className='container-cancel-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                        <button>Cancel</button>
                                    </div>
                                    <div className='container-confirm-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                        <button onClick={deletePost}>
                                            {effectWhileDeletePost
                                                ?
                                                <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="20%" visible={true} />
                                                :
                                                'Confirm'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {openEditPostPopup &&
                        <div className='container-edit-post-in-icon-settings-post-of-users'>
                            <div className='bg-onclick-to-close-edit-post-popup-in-container-edit-post-in-icon-settings-post-of-users'></div>
                            <div className='container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                {openEmojiPickerInEditPost &&
                                    <div onClick={() => setOpenEmojiPickerInEditPost(false)} className='bg-onclick-to-close-emoji-picker-in-edit-post-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'></div>
                                }
                                <div className='container-header-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                    <p>Edit post</p>
                                    <div onClick={closeEditPostPopupWithIconXmark} className='container-icon-xmark-in-container-header-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                        <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                <div className='container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                    <div className='container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                        <Link to={`/profile/${DataOfUserByUserId._id}`} className='container-img-in-container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!DataOfUserByUserId.profilePicture ? 'profileImgDefault.jpg' : DataOfUserByUserId.profilePicture}`} alt='imgProfile' />
                                        </Link>
                                        <div className='container-fullname-in-container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <Link to={`/profile/${DataOfUserByUserId._id}`} className='link-container-in-container-fullname-in-container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                <p>{DataOfUserByUserId.firstname} {DataOfUserByUserId.lastname}</p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='container-body-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                        <div className='container-textarea-in-container-body-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <textarea onChange={(e) => setMsgInEditPost(e.target.value)} value={msgInEditPost} ref={inputInEditPostRef} placeholder='Write something...'></textarea>
                                        </div>
                                        <div className='container-emoji-icon-in-container-body-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <div onClick={() => setOpenEmojiPickerInEditPost(!openEmojiPickerInEditPost)} className='fix-container-in-container-emoji-icon-in-container-body-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                <BsEmojiSmile className='icon-emoji-in-container-emoji-icon-in-container-body-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                            </div>
                                            {openEmojiPickerInEditPost &&
                                                <div className='container-emoji-picker-in-container-emoji-icon-in-container-body-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                    <EmojiPicker onEmojiClick={EmojiClickInEditPost} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {fileImgsInEditPost.length !== 0
                                        ?
                                        <div className='container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            {clearImgsInEditPost &&
                                                <div onClick={clearFileImgsInEditPost} className='container-icon-xmark-in-container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                    <FontAwesomeIcon icon={faCircleXmark} className='icon-xmark-in-container-icon-xmark-in-container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                                </div>
                                            }
                                            {clearImgsInEditPost &&
                                                <div style={{ cursor: fileImgsInEditPost.length === 1 ? 'default' : 'grab' }} className='container-img-in-container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                                                        {fileImgsInEditPost.map((e, index) => (
                                                            <SwiperSlide key={index}><img src={e} alt='postImg55' /></SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            }
                                        </div>
                                        :
                                        showImgsInEditPost &&
                                            postImgs.length !== 0
                                            ?
                                            <div className='container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                {clearImgsInEditPost &&
                                                    <div onClick={clearFileImgsInEditPost} className='container-icon-xmark-in-container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                        <FontAwesomeIcon icon={faCircleXmark} className='icon-xmark-in-container-icon-xmark-in-container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                                    </div>
                                                }
                                                {clearImgsInEditPost &&
                                                    <div className='container-img-in-container-img-swipper-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                        <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                                                            {postImgs.map((e, index) => (
                                                                <SwiperSlide key={index}><img src={`${process.env.REACT_APP_SERVER_DOMAIN}/postImg/${e}`} alt='postImg' /></SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <></>

                                    }
                                    {showVideoInEditPost &&
                                        postVideo !== ''
                                        ?
                                        openVideoInEditPost &&
                                        <div className='container-video-in-edit-post-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <div onClick={closeOpenVideoInEditPost} className='container-icon-xmark-in-container-video-in-edit-post-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                <FontAwesomeIcon icon={faCircleXmark} className='icon-smark-in-container-icon-xmark-in-container-video-in-edit-post-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                            </div>
                                            <video controls>
                                                <source src={`${process.env.REACT_APP_SERVER_DOMAIN}/postVideo/${postVideo}`}></source>
                                            </video>
                                        </div>
                                        :
                                        <></>
                                    }
                                    {fileVideoInEditPost !== null
                                        ?
                                        <div className='container-show-file-video-name-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <FontAwesomeIcon icon={faFileCircleCheck} className='icon-file-video-in-container-show-file-video-name-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                            <p>{fileVideoInEditPost?.name}</p>
                                            <div onClick={() => setFileVideoInEditPost(null)} className='container-icon-xmark-in-container-show-file-video-name-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-show-file-video-name-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className='container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                    <div className='add-to-your-post-container-in-container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                        <p>Add to your post</p>
                                    </div>
                                    <div className='container-all-icon-in-container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                        <div onClick={openWindowFileImgUpload} className='container-icon-img-in-container-all-icon-in-container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <CiImageOn className='icon-img-in-container-icon-img-in-container-all-icon-in-container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                            <input name='postImage' onClick={(e) => e.target.value = null} onChange={(e) => selectFileImgsToUploadInEditPost(e)} ref={inputFileImgsInEditPostRef} type='file' accept='image/png , image/jpeg , image/webp' multiple style={{ display: 'none' }} />
                                        </div>
                                        <div onClick={openWindowFileVideoUpload} className='container-icon-clip-in-container-all-icon-in-container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <SlPaperClip className='icon-clip-in-container-icon-clip-in-container-all-icon-in-container-footer-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users' />
                                            <input name='postVideo' onClick={(e) => e.target.value = null} onChange={(e) => selectFileVideoToUploadInEditPost(e)} ref={inputFileVideoInEditPostRef} type='file' accept='video/mp4' style={{ display: 'none' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className='container-button-save-edit-post-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                    <button onClick={saveEditPost} disabled={disableEditPostButton}>
                                        {effectWhileEditPost
                                            ?
                                            <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="5%" visible={true} />
                                            :
                                            'Save'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                postMsg !== ''
                    ?
                    <div className='message-in-post-container'>
                        <p>{postMsg}</p>
                    </div>
                    :
                    <></>
            }
            {
                postImgs.length !== 0
                    ?
                    <div style={{ cursor: postImgs.length === 1 ? 'default' : 'grab', marginTop: !postMsg ? '0' : '10px' }} className='content-center-in-post-of-users'>
                        <div className='container-img-post-of-users'>
                            <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                                {postImgs.map((e, index) => (
                                    <SwiperSlide key={index}><img src={`${process.env.REACT_APP_SERVER_DOMAIN}/postImg/${e}`} alt='postImg' /></SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    :
                    <></>
            }
            {
                postVideo !== ''
                    ?
                    <div style={{ marginTop: !postMsg ? '0' : '10px' }} className='container-post-video-in-container-post-of-users-fix'>
                        <div className='container-post-video-in-container-post-of-users'>
                            <video controls>
                                <source src={`${process.env.REACT_APP_SERVER_DOMAIN}/postVideo/${postVideo}`}></source>
                            </video>
                        </div>
                    </div>
                    :
                    <></>
            }
            <div className='content-footer-in-post-of-users'>
                <div className='container-icons-in-content-footer'>
                    <div className='heart-icon-container'>
                        <div className='box-of-icon-heart-in-container' onClick={likePost}>
                            {postLikes.includes(activeUserId)
                                ?
                                <AiFillHeart className='heart-icon-active' />
                                :
                                <AiOutlineHeart className='heart-icon' />
                            }
                        </div>
                        <span onClick={() => setOpenPeopleLikeYourPost(true)}>{postLikes.length === 0 ? '' : postLikes.length} {postLikes.length === 1 ? 'Like' : postLikes.length === 0 ? 'Like' : 'Likes'}</span>
                        {openPeopleLikedYourPost &&
                            <div className='bg-people-likes-post-list'>
                                <>
                                    <div className='bg-onclick-to-close-people-likes-post-list' onClick={() => setOpenPeopleLikeYourPost(false)}></div>
                                    <div className='container-people-likes-post-list'>
                                        <div className='container-header-in-people-likes-post-list'>
                                            <p>People liked post</p>
                                            <div onClick={() => setOpenPeopleLikeYourPost(false)} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                                                <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                        <div className='container-center-in-people-likes-post-list'>
                                            {postLikes.length === 0
                                                ?
                                                <div className='container-no-one-like-in-container-profile-card-in-people-likes-post-list'>
                                                    <p>No one likes</p>
                                                </div>
                                                :
                                                postLikes.map((e) => (
                                                    <PeopleLikedYourPost key={e} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive} UserIdToLikeInPost={e} userInfo={userInfo} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            </div>
                        }
                    </div>
                    <div className='comment-icon-container' onClick={focusInputComment}>
                        <TbMessageCircle2 className='comment-icon' /><span className='span-comment-icon-hover'>Comment</span>
                    </div>
                    <div className='share-icon-container' onClick={() => setOpenSharePostPopup(true)}>
                        <IoPaperPlaneOutline className='share-icon' /><span className='span-share-icon-hover'>Share</span>
                    </div>
                    {openSharePostPopup &&
                        <>
                            <div className='container-share-post-in-container-icons-in-content-footer'>
                                <div className='bg-on-click-to-close-share-post-popup'></div>
                                <div className='container-share-content-post-in-container-icons-in-content-footer'>
                                    {openEmojiPickerInSharePost &&
                                        <div onClick={() => setOpenEmojiPickerInSharePost(false)} className='bg-on-click-to-close-emoji-picker-in-container-share-post-in-container-icons-in-content-footer'></div>
                                    }
                                    <div className='header-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                        <p>Share post</p>
                                        <div onClick={closeSharePostPopup} className='container-icon-xmark-in-header-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                            <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-header-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer' />
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                    <div className='body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                        <div className='container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                            <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataOfUserActiveByUserId._id}`} className='container-img-profile-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataOfUserActiveByUserId.profilePicture ? 'profileImgDefault.jpg' : dataOfUserActiveByUserId.profilePicture}`} alt='imgProfile' />
                                            </Link>
                                            <div className='container-fullname-of-user-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataOfUserActiveByUserId._id}`} className='text-decoration-in-container-fullname-of-user-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <p>{dataOfUserActiveByUserId.firstname} {dataOfUserActiveByUserId.lastname}</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                            <textarea value={msgInSharePost} ref={inputInSharePostRef} onChange={(e) => setMsgInSharePost(e.target.value)} placeholder='What are you thinking' className='msg-style-in-container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer' />
                                            <div className='emoji-container-in-share-post-in-container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <div onClick={() => setOpenEmojiPickerInSharePost(!openEmojiPickerInSharePost)} className='fix-container-onclick-in-emoji-container-in-share-post-in-container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <BsEmojiSmile className='emoji-icon-in-emoji-container-in-share-post-in-container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer' />
                                                </div>
                                                {openEmojiPickerInSharePost &&
                                                    <div className='container-emoji-picker-in-container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <EmojiPicker onEmojiClick={EmojiClickInSharePost} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className='container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                            {postImgs.length !== 0
                                                ?
                                                <div style={{ cursor: postImgs.length === 1 ? 'default' : 'grab' }} className='content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <div className='container-img-post-of-users-in-content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                                                            {postImgs.map((e, index) => (
                                                                <SwiperSlide key={index}><img src={`${process.env.REACT_APP_SERVER_DOMAIN}/postImg/${e}`} alt='postImg' className='border-radius-none-in-container-img-post-of-users-in-content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer' /></SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                            }
                                            {postVideo !== ''
                                                ?
                                                <div className='container-video-in-post-to-share-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <video controls>
                                                        <source src={`${process.env.REACT_APP_SERVER_DOMAIN}/postVideo/${postVideo}`}></source>
                                                    </video>
                                                </div>
                                                :
                                                <></>
                                            }
                                            <div className='container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <div className='container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${DataOfUserByUserId._id}`} className='container-img-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!DataOfUserByUserId.profilePicture ? 'profileImgDefault.jpg' : DataOfUserByUserId.profilePicture}`} alt='imgProfile' />
                                                    </Link>
                                                    <div className='container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${DataOfUserByUserId._id}`} className='text-decoration-none-in-container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                            <p>{DataOfUserByUserId.firstname} {DataOfUserByUserId.lastname}</p>
                                                        </Link>
                                                        <div className='container-modifydate-post-in-container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                            <p>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {postMsg !== ''
                                                    ?
                                                    <div className='container-post-msg-of-user-to-share-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <p>{postMsg}</p>
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='container-footer-in-container-share-content-post-in-container-icons-in-content-footer'>
                                        <button onClick={sharePost}>
                                            {effectWhileSharePost
                                                ?
                                                <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="5%" visible={true} />
                                                :
                                                'Post'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            {commentOfUsers.length !== 0 &&
                <p onClick={() => setOpenComments(!openComments)} className='style-view-comment'>{openComments === false ? `View ${commentOfUsers.length} ${commentOfUsers.length > 1 ? 'comments' : 'comment'}` : `Hidden ${commentOfUsers.length > 1 ? 'comments' : 'comment'}`}</p>
            }
            <div className='container-comments-of-users'>
                {openComments &&
                    <>
                        {commentOfUsers.map((e) => (
                            <Comment key={e?._id} setCommentOfUsers={setCommentOfUsers} postId={postId} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive} likeCommentStatus={likeCommentStatus} setLikeCommentStatus={setLikeCommentStatus} commentLikes={e.commentLikes} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} setOpenProfileStatus={setOpenProfileStatus} setDeleteCommentStatus={setDeleteCommentStatus} deleteCommentStatus={deleteCommentStatus} editCommentStatus={editCommentStatus} setEditCommentStatus={setEditCommentStatus} userInfo={userInfo} activeUserId={activeUserId} commentId={e._id} userIdToComment={e.userIdToComment} commentMsgs={e.commentMsgs} commentImg={e.commentImg} createdAt={e.createdAt} />
                        ))}
                    </>
                }
            </div>
            <div className='create-comment-container-in-post-of-users'>
                <Link onClick={openProfilePage} to={`/profile/${dataOfUserActiveByUserId._id}`} className='container-img-profile-in-create-comment-container-in-post-of-users'>
                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataOfUserActiveByUserId.profilePicture ? 'profileImgDefault.jpg' : dataOfUserActiveByUserId.profilePicture}`} alt='imgProfileUser' />
                </Link>
                <div className='write-comment-container-in-create-comment-container-in-post-of-users'>
                    <form onSubmit={(e) => createComment(e)} encType='multipart/form-data'>
                        <input type='text' placeholder='Write your comment...' ref={inputCommentRef} value={commetMsg} onChange={(e) => setCommentMsg(e.target.value)} />
                        <input type='submit' style={{ display: 'none' }}></input>
                        <div className='emoji-picker-container-in-create-comment-container-in-post-of-users' onClick={() => setOpenEmojiPickerInComment(!openEmojiPickerInComment)}>
                            <BsEmojiSmile className='emoji-picker-icon-in-create-comment-container-in-post-of-users' />
                        </div>
                        <div className='photo-upload-container-in-create-comment-container-in-post-of-users' onClick={() => selectFileIconRef.current.click()}>
                            <SlPaperClip className='photo-upload-icon-in-create-comment-container-in-post-of-users' />
                            <input name='commentImage' ref={selectFileIconRef} onChange={(e) => selectFileToUploadInComment(e)} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
                        </div>
                    </form>
                    {openEmojiPickerInComment &&
                        <>
                            <div className='bg-onclick-to-close-emoji-popup-picker-in-create-comment-container-in-post-of-users' onClick={() => setOpenEmojiPickerInComment(false)}></div>
                            {postImgs.length !== 0 || postVideo !== ''
                                ?
                                <div className='style-emoji-picker-fix-in-write-comment-container-in-create-comment-container-in-post-of-users'>
                                    <EmojiPicker onEmojiClick={EmojiClickInCreateComment} />
                                </div>
                                :
                                <div style={{ top: '110%' }} className='style-emoji-picker-fix-in-write-comment-container-in-create-comment-container-in-post-of-users'>
                                    <EmojiPicker onEmojiClick={EmojiClickInCreateComment} />
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
            {
                openPreviewImg &&
                <div className='img-preview-container-in-create-comment-container-in-post-of-users'>
                    <div className='box-of-img-container-in-create-comment-container-in-post-of-users'>
                        <FontAwesomeIcon onClick={clearFileToSelect} icon={faCircleXmark} className='xmark-icon-in-container-xmark-icon-in-box-of-img-container-in-create-comment-container-in-post-of-users' />
                        <img src={previewImgFile} alt='previewImgComment' />
                    </div>
                </div>
            }
        </div >
    );
}

export default Post;