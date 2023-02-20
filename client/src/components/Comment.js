import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';

const Comment = () => {
    const editSelectFileRef = useRef();
    const inputEditCommentRef = useRef();

    const [openCommentsOptions, setOpenCommentOptions] = useState(false);
    const [openEmojiPickerInEditComment, setOpenEmojiPickerInEditComment] = useState(false);
    const [editCommentMsg, setEditCommentMsg] = useState('');
    const [cursorPosition, setCursorPosition] = useState();
    const [openImgPreviewInEditComment, setOpenImgPreviewInEditComment] = useState(false);
    const [previewImgFileInEditComment, setPreviewImgFileInEditComment] = useState('');
    const [openEditComment, setOpenEditComment] = useState(false);
    const [commentMsg, setCommentMsg] = useState('Hello...');
    const [openAlertConfirmToDeleteComment, setOpenAlertConfirmToDeleteComment] = useState(false);

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
            setOpenImgPreviewInEditComment(true);
        }
    }

    const clearFileToSelect = () => {
        setPreviewImgFileInEditComment('');
        setOpenImgPreviewInEditComment(false);
    }

    const openCommentEdit = () => {
        setOpenEditComment(true);
        setOpenCommentOptions(false);
        inputEditCommentRef.current.focus();
    }

    const closeAlertConfirmToDeleteComment = () => {
        setOpenCommentOptions(false);
        setOpenAlertConfirmToDeleteComment(false);
    }

    useEffect(() => {
        if (openEditComment) {
            inputEditCommentRef.current.selectionEnd = cursorPosition;
        }
    }, [cursorPosition]);

    useEffect(() => {
        setEditCommentMsg(commentMsg);
    }, [commentMsg]);

    return (
        <div className='fix-ui-container-comments-of-user-detail-in-container-comments-of-users'>
            <div className='container-comments-of-user-detail-in-container-comments-of-users'>
                <div className='box-of-container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <Link to='id' className='container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/user1.png`} alt='imgProfile' />
                    </Link>
                </div>
                {openEditComment
                    ?
                    <></>
                    :
                    <div className='container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <div className='container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                            <Link to='id' className='fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                <p className='fullname-of-users-in-container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>Bell bunlung</p>
                            </Link>
                            <span className='modity-date-in-container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>5 Minutes</span>
                        </div>
                        <div className='container-comment-msg-in-container-comments-of-user-detail-in-container-comments-of-users'>
                            <p>{commentMsg}</p>
                        </div>
                    </div>
                }
                {openEditComment &&
                    <>
                        <div className='container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                            <form encType='multipart/form-data'>
                                <input type='text' ref={inputEditCommentRef} onChange={(e) => setEditCommentMsg(e.target.value)} value={editCommentMsg} />
                                <input type='submit' style={{ display: 'none' }}></input>
                                <div onClick={() => setOpenEmojiPickerInEditComment(!openEmojiPickerInEditComment)} className='container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                    <BsEmojiSmile className='emoji-icon-in-container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                </div>
                                <div onClick={() => editSelectFileRef.current.click()} className='container-icon-clip-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                    <SlPaperClip className='clip-icon-in-container-icon-emoji-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                                    <input ref={editSelectFileRef} onChange={selectFileToUploadInEditComment} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
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
                        <span onClick={() => setOpenEditComment(false)} className='cancel-edit-comment-style-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</span>
                    </>
                }
                {openEditComment
                    ?
                    <></>
                    :
                    <div className='container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <div onClick={() => setOpenCommentOptions(!openCommentsOptions)} className='container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                            <FontAwesomeIcon className='icon-dots-vertical-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' icon={faEllipsisVertical}></FontAwesomeIcon>
                        </div>
                        {openCommentsOptions &&
                            <>
                                <div className='bg-onclick-to-close-comment-options' onClick={() => setOpenCommentOptions(false)}></div>
                                <div className='comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                    <div onClick={openCommentEdit} className='container-icon-edit-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <FontAwesomeIcon icon={faPenToSquare} className='icon-edit-comment-in-container-icon-edit-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' />&nbsp;&nbsp;<span>Edit</span>
                                    </div>
                                    <div onClick={() => setOpenAlertConfirmToDeleteComment(true)} className='container-icon-delete-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <FontAwesomeIcon icon={faTrash} className='icon-delete-comment-in-container-icon-delete-comment-in-comment-options-popup-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' />&nbsp;&nbsp;<span>Delete</span>
                                    </div>
                                </div>
                                {openAlertConfirmToDeleteComment &&
                                    <div className='container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                        <div onClick={closeAlertConfirmToDeleteComment} className='bg-on-click-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'></div>
                                        <div className='container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                            <div className='confirm-delete-text-container'>
                                                <p>Are you sure to delete a comment?</p>
                                            </div>
                                            <div className='container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                                                <button onClick={closeAlertConfirmToDeleteComment} className='cancel-button-in-container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>Cancel</button>
                                                <button className='confirm-button-in-container-botton-in-container-alert-confirm-to-delete-comment-in-container-alert-confirm-to-delete-comment-in-container-confirm-to-delete-comment-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                }
            </div>
            {openImgPreviewInEditComment &&
                <div className='container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <div className='box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <FontAwesomeIcon onClick={clearFileToSelect} icon={faCircleXmark} className='icon-xmark-in-box-of-img-in-container-img-preview-in-edit-comment-in-container-edit-comment-in-container-comments-of-user-detail-in-container-comments-of-users' />
                        <img src={previewImgFileInEditComment} alt='imgPreviewInEditComment' />
                    </div>
                </div>
            }
        </div>
    );
}

export default Comment;