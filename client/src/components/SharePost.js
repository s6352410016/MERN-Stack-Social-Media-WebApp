import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare, faTrash, faCircleXmark, faKey } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { TbMessageCircle2 } from "react-icons/tb";
import { HiOutlineXMark } from "react-icons/hi2";
import { RiLock2Line } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import PeopleLikedYourPost from './PeopleLikedYourPost';
import Comment from './Comment';
import { format } from 'date-fns';
import { RotatingLines } from 'react-loader-spinner';
import { SocketIOContext } from './SocketContext';

const SharePost = ({ setOpenProfileStatus, showProfilePageStatus, setShowProfilePageStatus, setCreateSharePostStatus, createSharePostStatus, userDataInActive, setFollowAndUnFollow, followAndUnFollow, setLikedSharePost, likedSharePost, setDeleteSharePostStatus, deleteSharePostStatus, setEditSharePostStatus, editSharePostStatus, postOfusers, userInfo, activeUserId, shareId, userIdToShare, postIdToShare, shareMsg, sharePostLikes, createdAt }) => {
    const { socket } = useContext(SocketIOContext);

    const selectFileIconRef = useRef();
    const inputCommentRef = useRef();
    const inputInSharePostRef = useRef();
    const inputInEditPostRef = useRef();

    const [openReactFragmentWhileComponentRender, setOpenReactFragmentWhileComponentRender] = useState(true);
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
    const [openDeletePostPopup, setOpenDeletePostPopup] = useState(false);
    const [effectWhileEditPost, setEffectWhileEditPost] = useState(false);
    const [effectWhileDeletePost, setEffectWhileDeletePost] = useState(false);
    const [disableEditPostButton, setDisableEditPostButton] = useState(true);
    const [DataOfUserByUserId, setDataOfUserByUserId] = useState({});
    const [dataOfUserActiveByUserId, setDataOfUserActiveByUserId] = useState({});
    const [dataPostOfUserBySharePostId, setDataPostOfUserBySharePostId] = useState({});
    const [dataUserIdToPostInSharePost, setDataUserIdToPostInSharePost] = useState({});
    const [selectFileImgToComment, setSelectFileImgToComment] = useState();
    const [createCommentStatus, setCreateCommentStatus] = useState(false);
    const [editCommentStatus, setEditCommentStatus] = useState(false);
    const [deleteCommentStatus, setDeleteCommentStatus] = useState(false);
    const [effectWhileSharePost, setEffectWhileSharePost] = useState(false);
    const [commentOfUsers, setCommentOfUsers] = useState([]);
    const [likeCommentStatus, setLikeCommentStatus] = useState(false);

    const saveEditPost = () => {
        setEffectWhileEditPost(true);
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateSharePost`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shareId: shareId,
                shareMsg: msgInEditPost.trim()
            })
        }).then((res) => {
            if (res.status === 200) {
                socket.current?.emit('postTransaction');
                setEffectWhileEditPost(false);
                setOpenEditPostPopup(false);
                setEditSharePostStatus(!editSharePostStatus);
            }
        });
    }

    const deletePost = () => {
        setEffectWhileDeletePost(true);
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteSharePost`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shareId: shareId,
                activeUserId: activeUserId,
            })
        }).then((res) => {
            if (res.status === 200) {
                socket.current?.emit('created');
                setEffectWhileDeletePost(false);
                setDeleteSharePostStatus(!deleteSharePostStatus);
                setOpenDeletePostPopup(false);
            }
        });
    }

    const likePost = () => {
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/sharePostLikeAndDislike`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shareId: shareId,
                userId: activeUserId,
                userIdToShare: userIdToShare,
            })
        }).then((res) => {
            if (res.status === 200) {
                socket.current?.emit('created');
                setLikedSharePost(!likedSharePost);
            }
        });
    }

    const createComment = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!!commetMsg.trim() && !selectFileImgToComment) {
            formData.append('postIdToComment', shareId);
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
                if (userIdToShare !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: shareId,
                            notificationOfCommentId: res.commentId,
                            notificationDetail: 'Comment your post',
                            notificationOfReceiverId: [userIdToShare]
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
            formData.append('postIdToComment', shareId);
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
                if (userIdToShare !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: shareId,
                            notificationOfCommentId: res.commentId,
                            notificationDetail: 'Comment your post',
                            notificationOfReceiverId: [userIdToShare]
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
            formData.append('postIdToComment', shareId);
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
                if (userIdToShare !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: shareId,
                            notificationOfCommentId: res.commentId,
                            notificationDetail: 'Comment your post',
                            notificationOfReceiverId: [userIdToShare]
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
                    postIdToShare: postIdToShare,
                    userIdToShare: activeUserId,
                    shareMsg: msgInSharePost.trim(),
                })
            });
            if (res.status === 201) {
                const sharePostData = await res.json();
                setEffectWhileSharePost(false);
                setCreateSharePostStatus(!createSharePostStatus);
                setOpenSharePostPopup(false);
                if (dataPostOfUserBySharePostId.userIdToPost !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: sharePostData?._id,
                            notificationDetail: 'Share your post',
                            notificationOfReceiverId: [dataPostOfUserBySharePostId.userIdToPost]
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

    const focusInputComment = () => {
        inputCommentRef.current.focus();
    }

    const openPostEditPopup = () => {
        setSettingInPostPopup(false);
        setOpenEditPostPopup(!openEditPostPopup);
    }

    const openPostDeletePopup = () => {
        setSettingInPostPopup(false);
        setOpenDeletePostPopup(true);
    }

    const clearFileToSelect = () => {
        setPreviewImgFile('');
        setSelectFileImgToComment();
        setOpenImgPreview(false);
    }

    const closeSharePostPopup = () => {
        setOpenSharePostPopup(false);
        setOpenEmojiPickerInSharePost(false);
        setMsgInSharePost('');
    }

    const closeEditPostPopup = () => {
        setOpenEditPostPopup(false);
        setOpenEmojiPickerInEditPost(false);
    }

    const closeEditPostPopupWithIconXmark = () => {
        setOpenEditPostPopup(false);
        setOpenEmojiPickerInEditPost(false);
    }

    const openSharePost = () => {
        if (dataPostOfUserBySharePostId !== undefined) {
            setOpenSharePostPopup(true);
        } else {
            setOpenSharePostPopup(false);
        }
    }

    const openProfilePage = () => {
        setShowProfilePageStatus(!showProfilePageStatus);
    }

    useEffect(() => {
        socket.current?.on('notificationServerEmit', () => {
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getCommentByPostId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: shareId,
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
                    postId: shareId,
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
                postId: shareId,
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
        if (!!msgInEditPost.trim()) {
            setDisableEditPostButton(false);
        } else {
            setDisableEditPostButton(true);
        }
    }, [msgInEditPost]);

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
            setMsgInEditPost(shareMsg);
        }
    }, [openEditPostPopup]);

    useEffect(() => {
        if (userIdToShare) {
            setDataOfUserByUserId(userInfo.find((e) => e._id === userIdToShare));
        }
        if (activeUserId) {
            setDataOfUserActiveByUserId(userInfo.find((e) => e._id === activeUserId));
        }
        if (postIdToShare) {
            setDataPostOfUserBySharePostId(postOfusers.find((e) => e._id === postIdToShare));
        }
        setOpenReactFragmentWhileComponentRender(false);
    });

    useEffect(() => {
        if (dataPostOfUserBySharePostId !== undefined) {
            setDataUserIdToPostInSharePost(userInfo.find((e) => e._id === dataPostOfUserBySharePostId.userIdToPost));
        }
    }, [dataPostOfUserBySharePostId]);

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
            {shareMsg !== ''
                ?
                <div className='container-share-post-msg-in-container-post-of-users'>
                    <p>{shareMsg}</p>
                </div>
                :
                <></>
            }
            {dataPostOfUserBySharePostId !== undefined
                ?
                <div className='container-post-to-share-in-container-post-of-users'>
                    {openReactFragmentWhileComponentRender
                        ?
                        <></>
                        :
                        dataPostOfUserBySharePostId.postImgs.length !== 0
                            ?
                            <div style={{ cursor: dataPostOfUserBySharePostId.postImgs.length === 1 ? 'default' : 'grab', marginTop: '0' }} className='content-center-in-post-of-users'>
                                <div className='container-img-post-of-users'>
                                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                                        {dataPostOfUserBySharePostId.postImgs.map((e, index) => (
                                            <SwiperSlide key={index}><img src={`${process.env.REACT_APP_SERVER_DOMAIN}/postImg/${e}`} alt='postImg' /></SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        dataPostOfUserBySharePostId.postVideo !== '' && dataPostOfUserBySharePostId.postVideo !== undefined
                            ?
                            <div className='container-post-video-in-container-post-of-users' style={{ marginTop: '0' }}>
                                <video controls>
                                    <source src={`${process.env.REACT_APP_SERVER_DOMAIN}/postVideo/${dataPostOfUserBySharePostId.postVideo}`}></source>
                                </video>
                            </div>
                            :
                            <></>
                    }
                    {!dataUserIdToPostInSharePost
                        ?
                        <></>
                        :
                        <div className='container-footer-in-container-post-to-share-in-container-post-of-users'>
                            <div className='container-header-in-container-footer-in-container-post-to-share-in-container-post-of-users'>
                                <Link onClick={openProfilePage} to={`/profile/${dataUserIdToPostInSharePost._id}`} className='container-img-profile-in-container-header-in-container-footer-in-container-post-to-share-in-container-post-of-users'>
                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataUserIdToPostInSharePost.profilePicture ? 'profileImgDefault.jpg' : dataUserIdToPostInSharePost.profilePicture}`} alt='userProfile' />
                                </Link>
                                <div className='container-fullname-user-in-container-header-in-container-footer-in-container-post-to-share-in-container-post-of-users'>
                                    <Link onClick={openProfilePage} to={`/profile/${dataUserIdToPostInSharePost._id}`} className='container-fullname-in-container-fullname-user-in-container-header-in-container-footer-in-container-post-to-share-in-container-post-of-users'>
                                        <p>{dataUserIdToPostInSharePost.firstname} {dataUserIdToPostInSharePost.lastname}</p>
                                    </Link>
                                    <span>{dataPostOfUserBySharePostId.createdAt !== undefined && format(new Date(dataPostOfUserBySharePostId.createdAt), "dd/MM/yyyy EEEE HH:mm")}</span>
                                </div>
                            </div>
                            {
                                dataPostOfUserBySharePostId.postMsg !== ''
                                    ?
                                    <div className='container-post-msg-to-share-in-container-footer-in-container-post-to-share-in-container-post-of-users'>
                                        <p>{dataPostOfUserBySharePostId.postMsg}</p>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    }
                </div>
                :
                <div className='container-post-content-not-available'>
                    <div className='content-in-container-post-content-not-available'>
                        <div className='container-icon-lock-in-content-in-container-post-content-not-available'>
                            <RiLock2Line className='icon-err-post-delete' />
                        </div>
                        <div className='flex-in-content-in-container-post-content-not-available'>
                            <p>Content not available</p>
                            <span>Can't view this content because the owner of the content you shared has deleted.</span>
                        </div>
                    </div>
                </div>
            }
            <div className='content-footer-in-post-of-users'>
                <div className='container-icons-in-content-footer'>
                    <div className='heart-icon-container'>
                        <div className='box-of-icon-heart-in-container' onClick={likePost}>
                            {sharePostLikes.includes(activeUserId)
                                ?
                                <AiFillHeart className='heart-icon-active' />
                                :
                                <AiOutlineHeart className='heart-icon' />
                            }
                        </div>
                        {openReactFragmentWhileComponentRender
                            ?
                            <></>
                            :
                            <span onClick={() => setOpenPeopleLikeYourPost(true)}>{sharePostLikes.length === 0 ? '' : sharePostLikes.length} {sharePostLikes.length === 1 ? 'Like' : sharePostLikes.length === 0 ? 'Like' : 'Likes'}</span>
                        }
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
                                            {sharePostLikes.length === 0
                                                ?
                                                <div className='container-no-one-like-in-container-profile-card-in-people-likes-post-list'>
                                                    <p>No one likes</p>
                                                </div>
                                                :
                                                sharePostLikes.map((e) => (
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
                    <div className='share-icon-container' onClick={openSharePost}>
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
                                            <textarea autoFocus value={msgInSharePost} ref={inputInSharePostRef} onChange={(e) => setMsgInSharePost(e.target.value)} placeholder='What are you thinking' className='msg-style-in-container-msg-in-share-post-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer' />
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
                                            {dataPostOfUserBySharePostId.postImgs.length !== 0
                                                ?
                                                <div style={{ cursor: dataPostOfUserBySharePostId.postImgs.length === 1 ? 'default' : 'grab' }} className='content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <div className='container-img-post-of-users-in-content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                                                            {dataPostOfUserBySharePostId.postImgs.map((e, index) => (
                                                                <SwiperSlide key={index}><img src={`${process.env.REACT_APP_SERVER_DOMAIN}/postImg/${e}`} alt='postImg' className='border-radius-none-in-container-img-post-of-users-in-content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer' /></SwiperSlide>
                                                            ))}
                                                        </Swiper>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                            }
                                            {dataPostOfUserBySharePostId.postVideo !== ''
                                                ?
                                                <div className='container-video-in-post-to-share-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <video controls>
                                                        <source src={`${process.env.REACT_APP_SERVER_DOMAIN}/postVideo/${dataPostOfUserBySharePostId.postVideo}`}></source>
                                                    </video>
                                                </div>
                                                :
                                                <></>
                                            }
                                            <div className='container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <div className='container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataUserIdToPostInSharePost._id}`} className='container-img-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataUserIdToPostInSharePost.profilePicture ? 'profileImgDefault.jpg' : dataUserIdToPostInSharePost.profilePicture}`} alt='imgProfile' />
                                                    </Link>
                                                    <div className='container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataUserIdToPostInSharePost._id}`} className='text-decoration-none-in-container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                            <p>{dataUserIdToPostInSharePost.firstname} {dataUserIdToPostInSharePost.lastname}</p>
                                                        </Link>
                                                        <div className='container-modifydate-post-in-container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                            <p>{format(new Date(dataPostOfUserBySharePostId.createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {dataPostOfUserBySharePostId.postMsg !== ''
                                                    ?
                                                    <div className='container-post-msg-of-user-to-share-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <p>{dataPostOfUserBySharePostId.postMsg}</p>
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
                            <Comment followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} setCommentOfUsers={setCommentOfUsers} userDataInActive={userDataInActive} commentLikes={e.commentLikes} setLikeCommentStatus={setLikeCommentStatus} likeCommentStatus={likeCommentStatus} postId={shareId} key={e?._id} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} setOpenProfileStatus={setOpenProfileStatus} setDeleteCommentStatus={setDeleteCommentStatus} deleteCommentStatus={deleteCommentStatus} editCommentStatus={editCommentStatus} setEditCommentStatus={setEditCommentStatus} userInfo={userInfo} activeUserId={activeUserId} commentId={e._id} userIdToComment={e.userIdToComment} commentMsgs={e.commentMsgs} commentImg={e.commentImg} createdAt={e.createdAt} />
                        ))}
                    </>
                }
            </div>
            <div className='create-comment-container-in-post-of-users'>
                <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataOfUserActiveByUserId._id}`} className='container-img-profile-in-create-comment-container-in-post-of-users'>
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
                            {dataPostOfUserBySharePostId.postImgs.length !== 0 || dataPostOfUserBySharePostId.postVideo !== ''
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
        </div>
    );
}

export default SharePost;