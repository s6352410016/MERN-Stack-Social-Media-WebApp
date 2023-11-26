import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import { format } from 'timeago.js';
import { RotatingLines } from 'react-loader-spinner';
import { SocketIOContext } from './SocketContext';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineXMark } from "react-icons/hi2";
import Reply from "./Reply";
import PeopleLikedYourPost from "./PeopleLikedYourPost";

const Comment = ({ setCommentOfUsers, postId, followAndUnFollow, setFollowAndUnFollow, userDataInActive, likeCommentStatus, setLikeCommentStatus, commentLikes, showProfilePageStatus, setShowProfilePageStatus, setOpenProfileStatus, deleteCommentStatus, setDeleteCommentStatus, editCommentStatus, setEditCommentStatus, userInfo, commentId, activeUserId, userIdToComment, commentMsgs, commentImg, createdAt }) => {
    const { socket } = useContext(SocketIOContext);

    const editSelectFileRef = useRef();
    const inputEditCommentRef = useRef();
    const inputReplyRef = useRef();
    const selectFileIconRef = useRef();

    const [openCommentsOptions, setOpenCommentOptions] = useState(false);
    const [openEmojiPickerInEditComment, setOpenEmojiPickerInEditComment] = useState(false);
    const [editCommentMsg, setEditCommentMsg] = useState('');
    const [cursorPosition, setCursorPosition] = useState();
    const [openImgPreviewInEditComment, setOpenImgPreviewInEditComment] = useState(false);
    const [previewImgFileInEditComment, setPreviewImgFileInEditComment] = useState('');
    const [openEditComment, setOpenEditComment] = useState(false);
    const [openAlertConfirmToDeleteComment, setOpenAlertConfirmToDeleteComment] = useState(false);
    const [effectWhileDeleteComment, setEffectWhileDeleteComment] = useState(false);
    const [deleteImgInEditComment, setDeleteImgInEditComment] = useState(false);
    const [dataCommentOfUserByUserId, setDataCommentOfUserByUserId] = useState({});
    const [selectFileImgInEditComment, setSelectFileImgInEditComment] = useState();
    const [openLikeUserListInComment, setOpenLikeUserListInComment] = useState(false);
    const [openReplyComment, setOpenReplyComment] = useState(false);
    const [dataUserActive, setDataUserActive] = useState({});
    const [replyMsg, setReplyMsg] = useState("");
    const [openEmojiPickerInReply, setOpenEmojiPickerInReply] = useState(false);
    const [openPreviewImg, setOpenPreviewImg] = useState(false);
    const [previewImgFile, setPreviewImgFile] = useState("");
    const [selectFileImgToReply, setSelectFileImgToReply] = useState(null);
    const [openImgPreview, setOpenImgPreview] = useState(false);
    const [cursorPositionInReply, setCursorPositionInReply] = useState(null);
    const [replyData, setReplyData] = useState([]);
    const [openReplyData, setOpenReplyData] = useState(false);
    const [editReplyStatus, setEditReplyStatus] = useState(false);

    const EmojiClickInEditComment = ({ emoji }) => {
        inputEditCommentRef.current.focus();
        const start = editCommentMsg.substring(0, inputEditCommentRef.current.selectionStart);
        const end = editCommentMsg.substring(inputEditCommentRef.current.selectionStart);
        const msg = start + emoji + end;
        setEditCommentMsg(msg);
        setCursorPosition(start.length + emoji.length);
    }

    const selectFileToUploadInEditComment = (e) => {
        if (e.target.files.length > 0) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPreviewImgFileInEditComment(imgUrl);
            setSelectFileImgInEditComment(e.target.files[0]);
            setOpenImgPreviewInEditComment(true);
        }
    }

    const clearFileToSelect = () => {
        setPreviewImgFileInEditComment('');
        setSelectFileImgInEditComment();
        setOpenImgPreviewInEditComment(false);
        setDeleteImgInEditComment(true);
    }

    const openAlertEditPostPopup = () => {
        setOpenAlertConfirmToDeleteComment(true);
    }

    const openCommentEdit = () => {
        setOpenEditComment(true);
        setOpenCommentOptions(false);
        setOpenImgPreviewInEditComment(true);
    }

    const closeAlertConfirmToDeleteComment = () => {
        setOpenCommentOptions(false);
        setOpenAlertConfirmToDeleteComment(false);
    }

    const closeAllImgPreview = () => {
        setDeleteImgInEditComment(false);
        setPreviewImgFileInEditComment('');
        setOpenEditComment(false);
        setOpenImgPreviewInEditComment(false);
        setOpenEmojiPickerInEditComment(false);
    }

    const editComment = (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (!!editCommentMsg.trim() || !!selectFileImgInEditComment || !!commentImg) {
            if (!!editCommentMsg.trim() && !selectFileImgInEditComment) {
                fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateCommentWithMsgs`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commentId: commentId,
                        commentMsgs: editCommentMsg.trim(),
                        deleteImgInEditComment: deleteImgInEditComment,
                    })
                }).then((res) => {
                    if (res.status === 200) {
                        if (deleteImgInEditComment) {
                            setCommentOfUsers((prev) => {
                                return prev.map((comment) => {
                                    if (comment?._id === commentId) {
                                        comment.commentImg = "";
                                    }
                                    return comment;
                                })
                            });
                            setDeleteImgInEditComment(false);
                        }
                        socket.current?.emit('commentTransaction');
                        setEditCommentStatus(!editCommentStatus);
                        setOpenEditComment(false);
                        setOpenImgPreviewInEditComment(false);
                        setEditCommentMsg('');
                        setOpenEmojiPickerInEditComment(false);
                        // setSelectFileImgInEditComment(null);
                    }
                });
                return;
            }
            if (!editCommentMsg.trim() && !!selectFileImgInEditComment) {
                formData.append('commentId', commentId);
                formData.append('commentMsgs', editCommentMsg.trim());
                formData.append('commentImage', selectFileImgInEditComment);
                fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateCommentWithImage`, {
                    method: 'PUT',
                    body: formData
                }).then((res) => {
                    if (res.status === 200) {
                        setCommentOfUsers((prev) => {
                            return prev.map((comment) => {
                                if (comment?._id === commentId) {
                                    comment.commentImg = "";
                                }
                                return comment;
                            })
                        });
                        socket.current?.emit('commentTransaction');
                        setDeleteImgInEditComment(false);
                        setEditCommentStatus(!editCommentStatus);
                        setOpenEditComment(false);
                        setOpenImgPreviewInEditComment(false);
                        setEditCommentMsg('');
                        setSelectFileImgInEditComment();
                        setOpenEmojiPickerInEditComment(false);
                    }
                });
                return;
            }
            if (!!editCommentMsg.trim() && !!selectFileImgInEditComment) {
                formData.append('commentId', commentId);
                formData.append('commentMsgs', editCommentMsg.trim());
                formData.append('commentImage', selectFileImgInEditComment);
                fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateCommentWithImage`, {
                    method: 'PUT',
                    body: formData
                }).then((res) => {
                    if (res.status === 200) {
                        setCommentOfUsers((prev) => {
                            return prev.map((comment) => {
                                if (comment?._id === commentId) {
                                    comment.commentImg = "";
                                }
                                return comment;
                            })
                        });
                        socket.current?.emit('commentTransaction');
                        setDeleteImgInEditComment(false);
                        setEditCommentStatus(!editCommentStatus);
                        setOpenEditComment(false);
                        setOpenImgPreviewInEditComment(false);
                        setEditCommentMsg('');
                        setSelectFileImgInEditComment();
                        setOpenEmojiPickerInEditComment(false);
                    }
                });
                return;
            }
            if (!!editCommentMsg.trim() && !selectFileImgInEditComment && deleteImgInEditComment) {
                formData.append('commentId', commentId);
                formData.append('commentMsgs', editCommentMsg.trim());
                fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateCommentWithImage`, {
                    method: 'PUT',
                    body: formData
                }).then((res) => {
                    if (res.status === 200) {
                        socket.current?.emit('commentTransaction');
                        setDeleteImgInEditComment(false);
                        setEditCommentStatus(!editCommentStatus);
                        setOpenEditComment(false);
                        setOpenImgPreviewInEditComment(false);
                        setEditCommentMsg('');
                        setOpenEmojiPickerInEditComment(false);
                        // setSelectFileImgInEditComment();
                    }
                });
                return;
            }
            if (!editCommentMsg.trim() && !selectFileImgInEditComment && deleteImgInEditComment === false && !!commentImg) {
                fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteCommentMsg`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        commentId: commentId,
                    })
                }).then((res) => {
                    if (res.status === 200) {
                        socket.current?.emit('commentTransaction');
                        setEditCommentStatus(!editCommentStatus);
                        setDeleteImgInEditComment(false);
                        setOpenEditComment(false);
                        setOpenImgPreviewInEditComment(false);
                        setEditCommentMsg('');
                        setOpenEmojiPickerInEditComment(false);
                        // setSelectFileImgInEditComment();
                    }
                });
                return;
            }
        }
    }

    const deleteComment = () => {
        setEffectWhileDeleteComment(true);
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteComment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentId: commentId
            })
        }).then((res) => {
            if (res.status === 200) {
                socket.current?.emit('created');
                setDeleteCommentStatus(!deleteCommentStatus);
                setOpenAlertConfirmToDeleteComment(false);
                setOpenCommentOptions(false);
                setEffectWhileDeleteComment(false);
            }
        });
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

    const clearFileToSelectInReply = () => {
        setPreviewImgFile('');
        setSelectFileImgToReply(null);
        setOpenImgPreview(false);
    }

    const closeCreateReply = () => {
        setOpenReplyComment(false);
        setPreviewImgFile('');
        setSelectFileImgToReply(null);
        setOpenImgPreview(false);
        setReplyMsg("");
    }

    const likeComment = async () => {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/likeAndDislikeComment`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commentId: commentId,
                    userIdToLike: activeUserId,
                    postId: postId,
                    userIdToComment: userIdToComment
                })
            });
            setLikeCommentStatus(!likeCommentStatus);
            socket?.current?.emit("created");
        } catch (err) {
            console.log(err);
        }
    }

    const createReplyComment = async (e) => {
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
                        postIdToReply: postId,
                        commentIdToReply: commentId,
                        userIdToReply: activeUserId,
                        replyMsg: replyMsg,
                    })
                });
                setReplyMsg("");
                setOpenReplyComment(false);
                setOpenReplyData(true);
                const data = await res.json();
                if (userIdToComment !== activeUserId) {
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
                            notificationDetail: 'Reply your comment',
                            notificationOfReceiverId: userIdToComment,
                        })
                    });
                    if (response.status === 201) {
                        return socket?.current?.emit("created");
                    }
                }
                socket?.current?.emit("created");
            }

            if (replyMsg.trim() === "" && selectFileImgToReply !== null) {
                formData.append("postIdToReply", postId);
                formData.append("commentIdToReply", commentId);
                formData.append("userIdToReply", activeUserId);
                formData.append("replyImg", selectFileImgToReply);
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createReply`, {
                    method: "POST",
                    body: formData
                });
                setPreviewImgFile("");
                setSelectFileImgToReply(null);
                setOpenImgPreview(false);
                setOpenReplyComment(false);
                setOpenReplyData(true);
                const data = await res.json();
                if (userIdToComment !== activeUserId) {
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
                            notificationDetail: 'Reply your comment',
                            notificationOfReceiverId: userIdToComment
                        })
                    });
                    if (response.status === 201) {
                        return socket?.current?.emit("created");
                    }
                }
                socket?.current?.emit("created");
            }

            if (replyMsg.trim() !== "" && selectFileImgToReply !== null) {
                formData.append("postIdToReply", postId);
                formData.append("commentIdToReply", commentId);
                formData.append("userIdToReply", activeUserId);
                formData.append("replyMsg", replyMsg);
                formData.append("replyImg", selectFileImgToReply);
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createReply`, {
                    method: "POST",
                    body: formData
                });
                setReplyMsg("");
                setPreviewImgFile("");
                setSelectFileImgToReply(null);
                setOpenImgPreview(false);
                setOpenReplyComment(false);
                setOpenReplyData(true);
                const data = await res.json();
                if (userIdToComment !== activeUserId) {
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
                            notificationDetail: 'Reply your comment',
                            notificationOfReceiverId: userIdToComment
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

    const getReplyByCommentId = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getReplyByCommentId`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentId: commentId
                })
            });
            const data = await res.json();
            // const sortedReply = data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setReplyData(data);
        } catch (err) {
            console.log(err);
        }
    }

    const openReplyCommentFunc = () => {
        setOpenReplyComment(true);
        inputReplyRef?.current?.focus();
    }

    useEffect(() => {
        inputReplyRef?.current?.focus();
    }, [openReplyComment]);

    useEffect(() => {
        if (openEditComment) {
            inputEditCommentRef.current.selectionEnd = cursorPosition;
        }

        if (openReplyComment) {
            inputReplyRef.current.selectionEnd = cursorPositionInReply;
        }
    }, [cursorPosition, cursorPositionInReply]);

    useEffect(() => {
        if (openEditComment) {
            inputEditCommentRef.current.focus();
        }
    });

    useEffect(() => {
        setEditCommentMsg(commentMsgs);
    }, [openEditComment]);

    useEffect(() => {
        if (userIdToComment) {
            setDataCommentOfUserByUserId(userInfo.find((e) => e._id === userIdToComment));
        }
    });

    useEffect(() => {
        setDataUserActive(userInfo.find((member) => member?._id === activeUserId));
    }, []);

    useEffect(() => {
        getReplyByCommentId();

        socket?.current?.on("notificationServerEmit", () => {
            getReplyByCommentId();
        });

        socket?.current?.on("replyTransactionServerEmit", () => {
            getReplyByCommentId();
        });
    }, []);

    return (
        <div className='fix-ui-container-comments-of-user-detail-in-container-comments-of-users'>
            <div className='container-comments-of-user-detail-in-container-comments-of-users'>
                <div className='box-of-container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataCommentOfUserByUserId._id}`} className='container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataCommentOfUserByUserId.profilePicture ? 'profileImgDefault.jpg' : dataCommentOfUserByUserId.profilePicture}`} alt='imgProfile' />
                    </Link>
                </div>
                <div className='main-container-fix-reply-comment-update'>
                    <div className='sub-container-fix-reply-comment-update'>
                        <div className='container-comment-info-fix-update'>
                            {openEditComment
                                ?
                                <></>
                                :
                                commentMsgs !== '' && commentImg !== ''
                                    ?
                                    <>
                                        <div className='container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <div className='container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataCommentOfUserByUserId._id}`} className='fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <p className='fullname-of-users-in-container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>{dataCommentOfUserByUserId.firstname} {dataCommentOfUserByUserId.lastname}</p>
                                                </Link>
                                                <span className='modity-date-in-container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>{format(createdAt)}</span>
                                            </div>
                                            <div className='container-comment-msg-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <p>{commentMsgs}</p>
                                            </div>
                                            <div className='container-comment-img-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/commentImg/${commentImg}`} alt='commentImg' />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    commentMsgs !== ''
                                        ?
                                        <div className='container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <div className='container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataCommentOfUserByUserId._id}`} className='fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <p className='fullname-of-users-in-container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>{dataCommentOfUserByUserId.firstname} {dataCommentOfUserByUserId.lastname}</p>
                                                </Link>
                                                <span className='modity-date-in-container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>{format(createdAt)}</span>
                                            </div>
                                            <div className='container-comment-msg-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <p>{commentMsgs}</p>
                                            </div>
                                        </div>
                                        :
                                        commentImg !== ''
                                            ?
                                            <div className='container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <div className='container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <Link onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataCommentOfUserByUserId._id}`} className='fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                        <p className='fullname-of-users-in-container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>{dataCommentOfUserByUserId.firstname} {dataCommentOfUserByUserId.lastname}</p>
                                                    </Link>
                                                    <span className='modity-date-in-container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>{format(createdAt)}</span>
                                                </div>
                                                <div className='container-comment-img-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/commentImg/${commentImg}`} alt='commentImg' />
                                                </div>
                                            </div>
                                            :
                                            <></>
                            }
                            {openEditComment &&
                                <>
                                    <div className='container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <form onSubmit={(e) => editComment(e)} encType='multipart/form-data'>
                                            <input type='text' ref={inputEditCommentRef} onChange={(e) => setEditCommentMsg(e.target.value)} value={editCommentMsg} />
                                            <input type='submit' style={{ display: 'none' }}></input>
                                            <div onClick={() => setOpenEmojiPickerInEditComment(!openEmojiPickerInEditComment)} className='container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <BsEmojiSmile className='emoji-icon-in-container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                            </div>
                                            <div onClick={() => editSelectFileRef.current.click()} className='container-icon-clip-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <SlPaperClip className='clip-icon-in-container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                                <input name='commentImage' ref={editSelectFileRef} onChange={selectFileToUploadInEditComment} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
                                            </div>
                                        </form >
                                        {openEmojiPickerInEditComment &&
                                            <>
                                                <div onClick={() => setOpenEmojiPickerInEditComment(false)} className='bg-onclick-to-close-emoji-picker-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'></div>
                                                <div className='container-emoji-picker-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <EmojiPicker onEmojiClick={EmojiClickInEditComment} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <span onClick={closeAllImgPreview} className='cancel-edit-comment-style-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</span>
                                </>
                            }
                            {openEditComment
                                ?
                                <></>
                                :
                                <div className='container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                    {activeUserId === userIdToComment
                                        ?
                                        <div onClick={() => setOpenCommentOptions(!openCommentsOptions)} className='container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <FontAwesomeIcon className='icon-dots-vertical-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' icon={faEllipsisVertical}></FontAwesomeIcon>
                                        </div>
                                        :
                                        <></>
                                    }
                                    {openCommentsOptions &&
                                        <>
                                            <div className='bg-onclick-to-close-comment-options' onClick={() => setOpenCommentOptions(false)}></div>
                                            <div className='comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <div onClick={openCommentEdit} className='container-icon-edit-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='icon-edit-comment-in-container-icon-edit-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' />&nbsp;&nbsp;<span>Edit</span>
                                                </div>
                                                <div onClick={openAlertEditPostPopup} className='container-icon-delete-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <FontAwesomeIcon icon={faTrash} className='icon-delete-comment-in-container-icon-delete-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' />&nbsp;&nbsp;<span>Delete</span>
                                                </div>
                                            </div>
                                            {openAlertConfirmToDeleteComment &&
                                                <div className='container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                    <div className='bg-on-click-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'></div>
                                                    <div className='container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                        <div className='confirm-delete-text-container'>
                                                            <p>Are you sure to delete a comment?</p>
                                                        </div>
                                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                                        <div className='container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                            <button onClick={closeAlertConfirmToDeleteComment} className='cancel-button-in-container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</button>
                                                            <button onClick={deleteComment} className='confirm-button-in-container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                                {effectWhileDeleteComment
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
                            }
                        </div>
                        <div className='container-reply-comment-update'>
                            <div className='container-like-in-container-reply-comment-update'>
                                <span onClick={() => setOpenLikeUserListInComment(true)}>{commentLikes?.length !== 0 && commentLikes?.length}</span>
                                <p onClick={likeComment}>{commentLikes?.includes(activeUserId) ? "Unlike" : commentLikes?.length > 1 ? "Likes" : "Like"}</p>
                            </div>
                            <p onClick={openReplyCommentFunc} className='reply-comment-update'>Reply</p>
                            {replyData.length > 0 && <p onClick={() => setOpenReplyData(!openReplyData)}>{openReplyData !== true ? `View ${replyData.length} ${replyData.length > 1 ? "replys" : "reply"}` : `Hidden ${replyData.length > 1 ? "replys" : "reply"}`} </p>}
                        </div>
                        {openImgPreviewInEditComment &&
                            <>
                                {!!previewImgFileInEditComment
                                    ?
                                    <div style={{ marginBottom: "10px" }} className='container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <div className='box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <FontAwesomeIcon onClick={clearFileToSelect} icon={faCircleXmark} className='icon-xmark-in-box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                            <img src={previewImgFileInEditComment} alt='imgPreviewInEditComment' />
                                        </div>
                                    </div>
                                    :
                                    commentImg !== ''
                                        ?
                                        <div style={{ marginBottom: "10px" }} className='container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <div className='box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <FontAwesomeIcon onClick={clearFileToSelect} icon={faCircleXmark} className='icon-xmark-in-box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/commentImg/${commentImg}`} alt='imgPreviewInEditComment' />
                                            </div>
                                        </div>
                                        :
                                        <></>
                                }
                            </>
                        }
                        {openLikeUserListInComment &&
                            <div className='bg-people-likes-post-list'>
                                <>
                                    <div className='bg-onclick-to-close-people-likes-post-list' onClick={() => setOpenLikeUserListInComment(false)}></div>
                                    <div className='container-people-likes-post-list'>
                                        <div className='container-header-in-people-likes-post-list'>
                                            <p>People liked comment</p>
                                            <div onClick={() => setOpenLikeUserListInComment(false)} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                                                <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                                        <div className='container-center-in-people-likes-post-list'>
                                            {commentLikes.length === 0
                                                ?
                                                <div className='container-no-one-like-in-container-profile-card-in-people-likes-post-list'>
                                                    <p>No one likes</p>
                                                </div>
                                                :
                                                commentLikes.map((e) => (
                                                    <PeopleLikedYourPost key={e} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive} UserIdToLikeInPost={e} userInfo={userInfo} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            </div>
                        }
                        {openReplyComment &&
                            <div style={{ height: "35px", marginBottom: "10px" }} className='create-comment-container-in-post-of-users fix-reply-update'>
                                <Link style={{ width: "35px", height: "35px" }} onClick={() => setShowProfilePageStatus(!showProfilePageStatus)} to={`/profile/${dataUserActive?._id}`} className='container-img-profile-in-create-comment-container-in-post-of-users fix-reply-update'>
                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataUserActive?.profilePicture ? 'profileImgDefault.jpg' : dataUserActive?.profilePicture}`} alt='imgProfileUser' />
                                </Link>
                                <div className='write-comment-container-in-create-comment-container-in-post-of-users fix-reply-update'>
                                    <form onSubmit={(e) => createReplyComment(e)} encType='multipart/form-data'>
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
                    </div>
                    {openReplyData &&
                        replyData.map((reply) => (
                            <Reply key={reply?._id} replyId={reply._id} commentIdToReply={reply.commentIdToReply} userIdToReply={reply.userIdToReply} replyMsgs={reply.replyMsg} replyImg={reply.replyImg} tagUserId={reply.tagUserId} replyLikes={reply.replyLikes} createdAt={reply.createdAt} userInfo={userInfo} setShowProfilePageStatus={setShowProfilePageStatus} showProfilePageStatus={showProfilePageStatus} activeUserId={activeUserId} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive} postId={postId} commentId={commentId} editReplyStatus={editReplyStatus} setEditReplyStatus={setEditReplyStatus} setReplyData={setReplyData} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Comment;