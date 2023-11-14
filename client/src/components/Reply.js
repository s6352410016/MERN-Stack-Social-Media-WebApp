import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { RotatingLines } from 'react-loader-spinner';
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { HiOutlineXMark } from "react-icons/hi2";
import { format } from 'timeago.js';
import PeopleLikedYourPost from './PeopleLikedYourPost';
import { SocketIOContext } from './SocketContext';
import { toast, Toaster } from "react-hot-toast";

const Reply = ({ replyId, commentIdToReply, userIdToReply, replyMsgs, replyImg, tagUserId, replyLikes, createdAt, userInfo, setShowProfilePageStatus, showProfilePageStatus, activeUserId, followAndUnFollow, setFollowAndUnFollow, userDataInActive, postId, commentId, editReplyStatus, setEditReplyStatus, setReplyData }) => {
    const { socket } = useContext(SocketIOContext);

    const inputEditReplyRef = useRef();
    const editSelectFileRef = useRef();
    const inputReplyRef = useRef();
    const selectFileIconRef = useRef();

    const [openReplyOption, setOpenReplyOptions] = useState(false);
    const [openAlertConfirmToDeleteReply, setOpenAlertConfirmToDeleteReply] = useState(false);
    const [effectWhileDeleteReply, setEffectWhileDeleteReply] = useState(false);
    const [openEditReply, setOpenEditReply] = useState(false);
    const [openImgPreviewInEditReply, setOpenImgPreviewInEditReply] = useState(false);
    const [editReplyMsg, setEditReplyMsg] = useState("");
    const [openEmojiPickerInEditReply, setOpenEmojiPickerInEditReply] = useState(false);
    const [previewImgFileInEditReply, setPreviewImgFileInEditReply] = useState(false);
    const [selectFileImgInEditReply, setSelectFileImgInEditReply] = useState(null);
    const [cursorPosition, setCursorPosition] = useState(null);
    const [deleteImgInEditReply, setDeleteImgInEditReply] = useState(false);
    const [openLikeUserListInReply, setOpenLikeUserListInReply] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [replyMsg, setReplyMsg] = useState("");
    const [openEmojiPickerInReply, setOpenEmojiPickerInReply] = useState(false);
    const [previewImgFile, setPreviewImgFile] = useState("");
    const [selectFileImgToReply, setSelectFileImgToReply] = useState(null);
    const [openImgPreview, setOpenImgPreview] = useState(false);
    const [cursorPositionInReply, setCursorPositionInReply] = useState(null);
    const [tagUser, setTagUser] = useState(true);
    const [dataUserByUserIdToReply, setDataUserByUserIdToReply] = useState({});
    const [activeUserData, setActiveUserData] = useState({});
    const [tagUserData, setTagUserdata] = useState({});

    const closeAlertConfirmToDeleteReply = () => {
        setOpenReplyOptions(false);
        setOpenAlertConfirmToDeleteReply(false);
    }

    const openAlertEditReplyPopup = () => {
        setOpenAlertConfirmToDeleteReply(true);
    }

    const openReplyEdit = () => {
        setOpenEditReply(true);
        setOpenReplyOptions(false);
        setOpenImgPreviewInEditReply(true);
    }

    const selectFileToUploadInEditReply = (e) => {
        if (e.target.files.length > 0) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPreviewImgFileInEditReply(imgUrl);
            setSelectFileImgInEditReply(e.target.files[0]);
            setOpenImgPreviewInEditReply(true);
            inputEditReplyRef?.current?.focus();
        }
    }

    const EmojiClickInEditReply = ({ emoji }) => {
        inputEditReplyRef.current.focus();
        const start = editReplyMsg.substring(0, inputEditReplyRef.current.selectionStart);
        const end = editReplyMsg.substring(inputEditReplyRef.current.selectionStart);
        const msg = start + emoji + end;
        setEditReplyMsg(msg);
        setCursorPosition(start.length + emoji.length);
    }

    const clearFileToSelect = () => {
        setPreviewImgFileInEditReply('');
        setSelectFileImgInEditReply(null);
        setOpenImgPreviewInEditReply(false);
        setDeleteImgInEditReply(true);
        inputEditReplyRef?.current?.focus();
    }

    const closeAllImgPreview = () => {
        setDeleteImgInEditReply(false);
        setPreviewImgFileInEditReply('');
        setOpenEditReply(false);
        setOpenImgPreviewInEditReply(false);
        setOpenEmojiPickerInEditReply(false);
    }

    const selectFileToUploadInReply = (e) => {
        if (e.target.files.length > 0) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPreviewImgFile(imgUrl);
            setSelectFileImgToReply(e.target.files[0]);
            setOpenImgPreview(true);
            inputReplyRef?.current?.focus();
        }
    }

    const EmojiClickInCreateReply = ({ emoji }) => {
        inputReplyRef.current.focus();
        const start = replyMsg.substring(0, inputReplyRef.current.selectionStart);
        const end = replyMsg.substring(inputReplyRef.current.selectionStart);
        const msg = start + emoji + end;
        setReplyMsg(msg);
        setCursorPositionInReply(start.length + emoji.length);
    }

    const closeCreateReply = () => {
        setOpenReply(false);
        setPreviewImgFile('');
        setSelectFileImgToReply(null);
        setOpenImgPreview(false);
        setReplyMsg("");
    }

    const clearFileToSelectInReply = () => {
        setPreviewImgFile('');
        setSelectFileImgToReply(null);
        setOpenImgPreview(false);
    }

    const likeReply = async () => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/likeAndDislikeReply`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    replyId: replyId,
                    userIdToLike: activeUserId,
                    postId: postId,
                    commentId: commentId,
                    userIdToReply: userIdToReply,
                })
            });
            socket?.current?.emit("created");
        } catch (err) {
            console.log(err);
        }
    }

    const editReply = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();

            if (editReplyMsg.trim() !== "" || selectFileImgInEditReply !== null || replyImg) {
                if (editReplyMsg.trim() !== "" && selectFileImgInEditReply === null) {
                    await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateReplyWithMsg`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            replyId: replyId,
                            replyMsg: editReplyMsg.trim(),
                            deleteImgInEditReply: deleteImgInEditReply,
                        })
                    });
                    if (deleteImgInEditReply) {
                        setReplyData((prev) => {
                            return prev.map((reply) => {
                                if (reply?._id === replyId) {
                                    reply.replyImg = "";
                                }
                                return reply;
                            });
                        });
                        setDeleteImgInEditReply(false);
                    }
                    setEditReplyStatus(!editReplyStatus);
                    setOpenEditReply(false);
                    setEditReplyMsg("");
                    setPreviewImgFileInEditReply("");
                    setOpenImgPreviewInEditReply(false);
                    socket?.current?.emit("replyTransaction");
                    return;
                }

                if (editReplyMsg.trim() === "" && selectFileImgInEditReply !== null) {
                    formData.append("replyId", replyId);
                    formData.append("replyImg", selectFileImgInEditReply);
                    await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateReplyWithImage`, {
                        method: "PUT",
                        body: formData
                    });
                    setReplyData((prev) => {
                        return prev.map((reply) => {
                            if (reply?._id === replyId) {
                                reply.replyImg = "";
                            }
                            return reply;
                        });
                    });
                    setDeleteImgInEditReply(false);
                    setEditReplyStatus(!editReplyStatus);
                    setOpenEditReply(false);
                    setPreviewImgFileInEditReply("");
                    setOpenImgPreviewInEditReply(false);
                    setSelectFileImgInEditReply(null);
                    socket?.current?.emit("replyTransaction");
                    return;
                }

                if (editReplyMsg.trim() === "" && openImgPreviewInEditReply) {
                    await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteReplyMsg`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            replyId: replyId,
                        })
                    });
                    setDeleteImgInEditReply(false);
                    setEditReplyStatus(!editReplyStatus);
                    setOpenEditReply(false);
                    setEditReplyMsg("");
                    setPreviewImgFileInEditReply("");
                    setOpenImgPreviewInEditReply(false);
                    setSelectFileImgInEditReply(null);
                    socket?.current?.emit("replyTransaction");
                    return;
                }

                if (editReplyMsg.trim() !== "" && selectFileImgInEditReply !== null) {
                    formData.append("replyId", replyId);
                    formData.append("replyMsg", editReplyMsg.trim());
                    formData.append("replyImg", selectFileImgInEditReply);
                    await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateReplyWithImageAndMsg`, {
                        method: "PUT",
                        body: formData
                    });
                    setReplyData((prev) => {
                        return prev.map((reply) => {
                            if (reply?._id === replyId) {
                                reply.replyImg = "";
                            }
                            return reply;
                        });
                    });
                    setDeleteImgInEditReply(false);
                    setEditReplyStatus(!editReplyStatus);
                    setOpenEditReply(false);
                    setEditReplyMsg("");
                    setPreviewImgFileInEditReply("");
                    setOpenImgPreviewInEditReply(false);
                    setSelectFileImgInEditReply(null);
                    socket?.current?.emit("replyTransaction");
                    return;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteReply = async () => {
        try {
            setEffectWhileDeleteReply(true);
            await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteReply`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    replyId: replyId
                })
            });
            setOpenReplyOptions(false);
            setOpenAlertConfirmToDeleteReply(false);
            setEffectWhileDeleteReply(false);
            socket?.current?.emit("created");
        } catch (err) {
            console.log(err);
        }
    }

    const createReply = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();

            if (replyMsg.trim() !== "" && selectFileImgToReply === null) {
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createReply`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commentIdToReply: commentId,
                        userIdToReply: activeUserId,
                        replyMsg: replyMsg,
                        tagUserId: userIdToReply,
                    })
                });
                setReplyMsg("");
                setOpenReply(false);
                const data = await res.json();
                if (userIdToReply !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: postId,
                            notificationOfCommentId: commentId,
                            notificationOfReplyId: data._id,
                            notificationDetail: 'Tag your in comment',
                            notificationOfReceiverId: userIdToReply,
                        })
                    });
                    if (response.status === 201) {
                        return socket?.current?.emit("created");
                    }
                }
                socket?.current?.emit("created");
            }

            if (replyMsg.trim() === "" && selectFileImgToReply !== null) {
                formData.append("commentIdToReply", commentId);
                formData.append("userIdToReply", activeUserId);
                formData.append("replyImg", selectFileImgToReply);
                formData.append("tagUserId", userIdToReply);
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createReply`, {
                    method: "POST",
                    body: formData
                });
                setPreviewImgFile("");
                setSelectFileImgToReply(null);
                setOpenImgPreview(false);
                setOpenReply(false);
                const data = await res.json();
                if (userIdToReply !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: postId,
                            notificationOfCommentId: commentId,
                            notificationOfReplyId: data._id,
                            notificationDetail: 'Tag your in comment',
                            notificationOfReceiverId: userIdToReply,
                        })
                    });
                    if (response.status === 201) {
                        return socket?.current?.emit("created");
                    }
                }
                socket?.current?.emit("created");
            }

            if (replyMsg.trim() !== "" && selectFileImgToReply !== null) {
                formData.append("commentIdToReply", commentId);
                formData.append("userIdToReply", activeUserId);
                formData.append("replyMsg", replyMsg);
                formData.append("replyImg", selectFileImgToReply);
                formData.append("tagUserId", userIdToReply);
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createReply`, {
                    method: "POST",
                    body: formData
                });
                setReplyMsg("");
                setPreviewImgFile("");
                setSelectFileImgToReply(null);
                setOpenImgPreview(false);
                setOpenReply(false);
                const data = await res.json();
                if (userIdToReply !== activeUserId) {
                    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            notificationOfUserId: activeUserId,
                            notificationOfPostId: postId,
                            notificationOfCommentId: commentId,
                            notificationOfReplyId: data._id,
                            notificationDetail: 'Tag your in comment',
                            notificationOfReceiverId: userIdToReply,
                        })
                    });
                    if (response.status === 201) {
                        return socket?.current?.emit("created");
                    }
                }
                socket?.current?.emit("created");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const openReplyFunc = () => {
        // if (userIdToReply === activeUserId) {
        //     return toast.error("You cannot tag yourself.");
        // }
        setOpenReply(true);
        setTagUser(true);
        inputReplyRef?.current?.focus();
    }

    useEffect(() => {
        inputReplyRef?.current?.focus();
    }, [openReply]);

    useEffect(() => {
        if (openEditReply) {
            inputEditReplyRef.current.selectionEnd = cursorPosition;
        }

        if (openReply) {
            inputReplyRef.current.selectionEnd = cursorPositionInReply;
        }
    }, [cursorPosition, cursorPositionInReply]);

    useEffect(() => {
        setDataUserByUserIdToReply(userInfo?.find((member) => member?._id === userIdToReply));
        setTagUserdata(userInfo?.find((member) => member?._id === tagUserId));
    });

    useEffect(() => {
        setEditReplyMsg(replyMsgs);
    }, [openEditReply]);

    useEffect(() => {
        setActiveUserData(userInfo?.find((member) => member?._id === activeUserId));
    }, []);

    useEffect(() => {
        inputEditReplyRef?.current?.focus();
        if (openReplyOption) {
            inputEditReplyRef?.current?.focus();
        }
    }, [openReplyOption]);

    return (
        <div style={{ marginBottom: "0" }} className='fix-ui-container-comments-of-user-detail-in-container-comments-of-users'>
            <Toaster />
            <div className='container-comments-of-user-detail-in-container-comments-of-users'>
                <div className='box-of-container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataUserByUserIdToReply?._id}`} className='container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataUserByUserIdToReply?.profilePicture ? 'profileImgDefault.jpg' : dataUserByUserIdToReply?.profilePicture}`} alt='imgProfile' />
                    </Link>
                </div>
                <div className='main-container-fix-reply-comment-update'>
                    <div className='sub-container-fix-reply-comment-update'>
                        <div className='container-comment-info-fix-update'>
                            {openEditReply
                                ?
                                <>
                                    <div className='container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <form onSubmit={(e) => editReply(e)} encType='multipart/form-data'>
                                            <input type='text' ref={inputEditReplyRef} onChange={(e) => setEditReplyMsg(e.target.value)} value={editReplyMsg} />
                                            <input type='submit' style={{ display: 'none' }}></input>
                                            <div onClick={() => setOpenEmojiPickerInEditReply(!openEmojiPickerInEditReply)} className='container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <BsEmojiSmile className='emoji-icon-in-container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                            </div>
                                            <div onClick={() => editSelectFileRef.current.click()} className='container-icon-clip-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <SlPaperClip className='clip-icon-in-container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                                <input name='commentImage' ref={editSelectFileRef} onChange={selectFileToUploadInEditReply} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
                                            </div>
                                        </form >
                                        {openEmojiPickerInEditReply &&
                                            <>
                                                <div onClick={() => setOpenEmojiPickerInEditReply(false)} className='bg-onclick-to-close-emoji-picker-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'></div>
                                                <div className='container-emoji-picker-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <EmojiPicker onEmojiClick={EmojiClickInEditReply} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <span onClick={closeAllImgPreview} className='cancel-edit-comment-style-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</span>
                                </>
                                :
                                <>
                                    <div className='container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <div className='container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataUserByUserIdToReply?._id}`} className='fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <p className='fullname-of-users-in-container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>{dataUserByUserIdToReply?.fullname}</p>
                                            </Link>
                                            <span className='modity-date-in-container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>{format(createdAt)}</span>
                                        </div>
                                        {replyMsgs !== "" && replyImg !== "" &&
                                            <>
                                                <div className='container-comment-msg-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <p>
                                                        {tagUserId !== "" &&
                                                            <Link to={`/profile/${tagUserData?._id}`} style={{ fontWeight: "bold", color: "#0074FE", textDecoration: "none", textTransform: "capitalize" }}>@{tagUserData?.firstname} {tagUserData?.lastname} </Link>
                                                        }
                                                        {replyMsgs}
                                                    </p>
                                                </div>
                                                <div className='container-comment-img-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/replyImg/${replyImg}`} alt='commentImg' />
                                                </div>
                                            </>
                                        }
                                        {replyMsgs !== "" && replyImg === "" &&
                                            <div className='container-comment-msg-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <p>
                                                    {tagUserId !== "" &&
                                                        <Link to={`/profile/${tagUserData?._id}`} style={{ fontWeight: "bold", color: "#0074FE", textDecoration: "none", textTransform: "capitalize" }}>@{tagUserData?.firstname} {tagUserData?.lastname} </Link>
                                                    }
                                                    {replyMsgs}
                                                </p>
                                            </div>
                                        }
                                        {replyImg !== "" && replyMsgs === "" &&
                                            <>
                                                {tagUserId !== "" &&
                                                    <Link to={`/profile/${tagUserData?._id}`} style={{ fontWeight: "bold", color: "#0074FE", textDecoration: "none", textTransform: "capitalize" }}>@{tagUserData?.firstname} {tagUserData?.lastname} </Link>
                                                }
                                                <div className='container-comment-img-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/replyImg/${replyImg}`} alt='commentImg' />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <div className='container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        {userIdToReply === activeUserId &&
                                            <div onClick={() => setOpenReplyOptions(!openReplyOption)} className='container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <FontAwesomeIcon className='icon-dots-vertical-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' icon={faEllipsisVertical}></FontAwesomeIcon>
                                            </div>
                                        }
                                        {openReplyOption &&
                                            <>
                                                <div className='bg-onclick-to-close-comment-options' onClick={() => setOpenReplyOptions(false)}></div>
                                                <div className='comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <div onClick={openReplyEdit} className='container-icon-edit-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                        <FontAwesomeIcon icon={faPenToSquare} className='icon-edit-comment-in-container-icon-edit-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' />&nbsp;&nbsp;<span>Edit</span>
                                                    </div>
                                                    <div onClick={openAlertEditReplyPopup} className='container-icon-delete-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                        <FontAwesomeIcon icon={faTrash} className='icon-delete-comment-in-container-icon-delete-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' />&nbsp;&nbsp;<span>Delete</span>
                                                    </div>
                                                </div>
                                                {openAlertConfirmToDeleteReply &&
                                                    <div className='container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                        <div className='bg-on-click-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'></div>
                                                        <div className='container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                            <div className='confirm-delete-text-container'>
                                                                <p>Are you sure to delete a reply?</p>
                                                            </div>
                                                            <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                                            <div className='container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                                <button onClick={closeAlertConfirmToDeleteReply} className='cancel-button-in-container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</button>
                                                                <button onClick={deleteReply} className='confirm-button-in-container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                                    {effectWhileDeleteReply
                                                                        ?
                                                                        <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="20%" visible={true} />
                                                                        :
                                                                        'Confirm'
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        <div className='container-reply-comment-update'>
                            <div className='container-like-in-container-reply-comment-update'>
                                <span onClick={() => setOpenLikeUserListInReply(true)}>{replyLikes.length !== 0 && replyLikes.length}</span>
                                <p onClick={likeReply}>{replyLikes.includes(activeUserId) ? "Unlike" : replyLikes.length > 1 ? "Likes" : "Like"}</p>
                            </div>
                            <p onClick={openReplyFunc} className='reply-comment-update'>Reply</p>
                        </div>
                        {openReply &&
                            <>
                                {tagUser &&
                                    <div className='container-tag-user-in-reply'>
                                        <span>{dataUserByUserIdToReply?.fullname}</span>
                                        {/* <div onClick={() => setTagUser(false)} className='container-icon-x-in-container-tag-user-in-reply'>
                                            <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                                        </div> */}
                                    </div>
                                }
                                <div style={{ height: "35px", marginBottom: "10px" }} className='create-comment-container-in-post-of-users fix-reply-update'>
                                    <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${activeUserData?._id}`} style={{ width: "35px", height: "35px" }} className='container-img-profile-in-create-comment-container-in-post-of-users fix-reply-update'>
                                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!activeUserData?.profilePicture ? 'profileImgDefault.jpg' : activeUserData?.profilePicture}`} alt='imgProfileUser' />
                                    </Link>
                                    <div className='write-comment-container-in-create-comment-container-in-post-of-users fix-reply-update'>
                                        <form onSubmit={(e) => createReply(e)} encType='multipart/form-data'>
                                            <input className='reply-input-fix-update' style={{ fontSize: "1rem" }} type='text' placeholder='Write your reply...' ref={inputReplyRef} value={replyMsg} onChange={(e) => setReplyMsg(e.target.value)} />
                                            <input type='submit' style={{ display: 'none' }}></input>
                                            <div className='emoji-picker-container-in-create-comment-container-in-post-of-users' onClick={() => setOpenEmojiPickerInReply(!openEmojiPickerInReply)}>
                                                <BsEmojiSmile className='emoji-picker-icon-in-create-comment-container-in-post-of-users' />
                                            </div>
                                            <div className='photo-upload-container-in-create-comment-container-in-post-of-users' onClick={() => selectFileIconRef.current.click()}>
                                                <SlPaperClip className='photo-upload-icon-in-create-comment-container-in-post-of-users' />
                                                <input name='commentImage' ref={selectFileIconRef} onChange={(e) => selectFileToUploadInReply(e)} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
                                            </div>
                                        </form>
                                        {openEmojiPickerInReply &&
                                            <>
                                                <div className='bg-onclick-to-close-emoji-popup-picker-in-create-comment-container-in-post-of-users' onClick={() => setOpenEmojiPickerInReply(false)}></div>
                                                <div className='style-emoji-picker-fix-in-write-comment-container-in-create-comment-container-in-post-of-users'>
                                                    <EmojiPicker onEmojiClick={EmojiClickInCreateReply} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <span onClick={closeCreateReply} className='cancel-edit-comment-style-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</span>
                                </div>
                            </>
                        }
                        {
                            openImgPreview &&
                            <div className='img-preview-container-in-create-comment-container-in-post-of-users'>
                                <div className='box-of-img-container-in-create-comment-container-in-post-of-users'>
                                    <FontAwesomeIcon onClick={clearFileToSelectInReply} icon={faCircleXmark} className='xmark-icon-in-container-xmark-icon-in-box-of-img-container-in-create-comment-container-in-post-of-users' />
                                    <img src={previewImgFile} alt='previewImgComment' />
                                </div>
                            </div>
                        }
                        {openImgPreviewInEditReply &&
                            <>
                                {!!previewImgFileInEditReply
                                    ?
                                    <div className='container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <div className='box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <FontAwesomeIcon onClick={clearFileToSelect} icon={faCircleXmark} className='icon-xmark-in-box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                            <img src={previewImgFileInEditReply} alt='imgPreviewInEditComment' />
                                        </div>
                                    </div>
                                    :
                                    replyImg !== ''
                                        ?
                                        <div className='container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <div className='box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <FontAwesomeIcon onClick={clearFileToSelect} icon={faCircleXmark} className='icon-xmark-in-box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/replyImg/${replyImg}`} alt='imgPreviewInEditComment' />
                                            </div>
                                        </div>
                                        :
                                        <></>
                                }
                            </>
                        }
                        {openLikeUserListInReply &&
                            <div className='bg-people-likes-post-list'>
                                <>
                                    <div className='bg-onclick-to-close-people-likes-post-list' onClick={() => setOpenLikeUserListInReply(false)}></div>
                                    <div className='container-people-likes-post-list'>
                                        <div className='container-header-in-people-likes-post-list'>
                                            <p>People liked reply</p>
                                            <div onClick={() => setOpenLikeUserListInReply(false)} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                                                <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                        <div className='container-center-in-people-likes-post-list'>
                                            {replyLikes.length === 0
                                                ?
                                                <div className='container-no-one-like-in-container-profile-card-in-people-likes-post-list'>
                                                    <p>No one likes</p>
                                                </div>
                                                :
                                                replyLikes.map((e) => (
                                                    <PeopleLikedYourPost key={e} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive} UserIdToLikeInPost={e} userInfo={userInfo} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Reply;