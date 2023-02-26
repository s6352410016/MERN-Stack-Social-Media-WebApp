import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare, faTrash, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import EmojiPicker from 'emoji-picker-react';
import PeopleLikedYourPost from './PeopleLikedYourPost';
import Comment from './Comment';

const SharePost = ({ postOfusers, dataForUser, activeUserId, shareId, userIdToShare, postIdToShare, shareMsg }) => {
    const selectFileIconRef = useRef();
    const inputCommentRef = useRef();
    const inputInSharePostRef = useRef();
    const inputInEditPostRef = useRef();

    const [settingInPostPopup, setSettingInPostPopup] = useState(false);
    const [openEmojiPickerInComment, setOpenEmojiPickerInComment] = useState(false);
    const [commetMsg, setCommentMsg] = useState('');
    const [cursorPosition, setCursorPosition] = useState();
    const [previewImgFile, setPreviewImgFile] = useState('');
    const [openPreviewImg, setOpenImgPreview] = useState(false);
    const [openPeopleLikedYourPost, setOpenPeopleLikeYourPost] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [iconLikeToggle, setIconLikeToggle] = useState(false);
    const [openSharePostPopup, setOpenSharePostPopup] = useState(false);
    const [openEmojiPickerInSharePost, setOpenEmojiPickerInSharePost] = useState(false);
    const [msgInSharePost, setMsgInSharePost] = useState('');
    const [inputMsgInSharePostCursorPosition, setInputMsgInSharePostCursorPosition] = useState();
    const [openEditPostPopup, setOpenEditPostPopup] = useState(false);
    const [openEmojiPickerInEditPost, setOpenEmojiPickerInEditPost] = useState(false);
    const [msgInEditPost, setMsgInEditPost] = useState('');
    const [inputInEditPostCursorPosition, setInputInEditPostCursorPosition] = useState();
    const [openDeletePostPopup, setOpenDeletePostPopup] = useState(false);
    const [DataOfUserByUserId, setDataOfUserByUserId] = useState({});
    const [dataOfUserActiveByUserId, setDataOfUserActiveByUserId] = useState({});
    const [dataPostOfUserBySharePostId, setDataPostOfUserBySharePostId] = useState({});
    const [commentOfUsers, setCommentOfUsers] = useState(
        [
            {
                commentId: 'cm01',
                postIdToComment: '01',
                userIdToComment: '63db82a0028c87f7d37c6628',
                commentMsgs: '',
                commentImg: 'img1.jpg',
                modifyDate: '14 Minutes'
            },
            {
                commentId: 'cm02',
                postIdToComment: '02',
                userIdToComment: '02',
                commentMsgs: '+++',
                commentImg: '',
                modifyDate: '1 hour'
            },
            {
                commentId: 'cm03',
                postIdToComment: '02',
                userIdToComment: '63db82a0028c87f7d37c6628',
                commentMsgs: 'ตึงเกิ๊นนนน',
                commentImg: '',
                modifyDate: '2 hours'
            }
        ]
    );

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
            setOpenImgPreview(true);
        }
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
        setOpenEditPostPopup(false)
    }

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
            setMsgInEditPost(dataPostOfUserBySharePostId.postMsg);
        }
    }, [openEditPostPopup]);

    useEffect(() => {
        if (userIdToShare) {
            setDataOfUserByUserId(dataForUser.find((e) => e.userId === userIdToShare));
        }
    });

    useEffect(() => {
        if (activeUserId) {
            setDataOfUserActiveByUserId(dataForUser.find((e) => e.userId === activeUserId));
        }
    });

    useEffect(() => {
        if (postIdToShare) {
            setDataPostOfUserBySharePostId(postOfusers.find((e) => e.postId === postIdToShare));
        }
    });

    return (
        <div className='container-post-of-users'>
            <div className='content-header-in-post-of-users'>
                <Link to='id' className='link-container-of-img'>
                    <div className='container-of-img-profile-users'>
                        <div className='container-width-full-img'>
                            <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${DataOfUserByUserId.image}`} alt='profileImg' />
                        </div>
                    </div>
                </Link>
                <div className='content-center-in-header-in-post-of-users'>
                    <Link to='id' className='link-in-container-of-fullname-user'><p className='fullname-of-post-users'>{DataOfUserByUserId.fullname}</p></Link>
                    <p className='modify-date-post-of-users'>{dataPostOfUserBySharePostId.postModifyDate}</p>
                </div>
                <div className='icon-settings-post-of-users'>
                    {activeUserId === DataOfUserByUserId.userId
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
                            <div onClick={() => setOpenDeletePostPopup(false)} className='bg-onclick-to-close-delete-post-popup-in-icon-settings-post-of-users'></div>
                            <div className='container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                <div className='container-header-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                    <p>Are you sure to delete a post?</p>
                                </div>
                                <div className='container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                    <div onClick={() => setOpenDeletePostPopup(false)} className='container-cancel-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                        <button>Cancel</button>
                                    </div>
                                    <div className='container-confirm-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                                        <button>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {openEditPostPopup &&
                        <div className='container-edit-post-in-icon-settings-post-of-users'>
                            <div onClick={closeEditPostPopup} className='bg-onclick-to-close-edit-post-popup-in-container-edit-post-in-icon-settings-post-of-users'></div>
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
                                <div className='container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                    <div className='container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                        <Link to='id' className='container-img-in-container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${DataOfUserByUserId.image}`} alt='imgProfile' />
                                        </Link>
                                        <div className='container-fullname-in-container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                            <Link to='id' className='link-container-in-container-fullname-in-container-header-in-container-body-in-container-edit-post-content-in-container-edit-post-in-icon-settings-post-of-users'>
                                                <p>{DataOfUserByUserId.fullname}</p>
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
                                    <button>Save</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                dataPostOfUserBySharePostId.postMsg !== ''
                    ?
                    <div className='message-in-post-container'>
                        <p>{dataPostOfUserBySharePostId.postMsg}</p>
                    </div>
                    :
                    <></>
            }
            {
                dataPostOfUserBySharePostId.postImgs.length !== 0
                    ?
                    <div className='content-center-in-post-of-users'>
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
                dataPostOfUserBySharePostId.postVideo !== ''
                    ?
                    < div className='container-post-video-in-container-post-of-users'>
                        <video controls>
                            <source src={`${process.env.REACT_APP_SERVER_DOMAIN}/postVideo/${dataPostOfUserBySharePostId.postVideo}`}></source>
                        </video>
                    </div>
                    :
                    <></>
            }
            <div className='content-footer-in-post-of-users'>
                <div className='container-icons-in-content-footer'>
                    <div className='heart-icon-container'>
                        <div className='box-of-icon-heart-in-container' onClick={() => setIconLikeToggle(!iconLikeToggle)}>
                            {iconLikeToggle
                                ?
                                <AiFillHeart className='heart-icon-active' />
                                :
                                <AiOutlineHeart className='heart-icon' />
                            }
                        </div>&nbsp;
                        <span onClick={() => setOpenPeopleLikeYourPost(true)}>{dataPostOfUserBySharePostId.postLikes.length === 0 ? '' : dataPostOfUserBySharePostId.postLikes.length} {dataPostOfUserBySharePostId.postLikes.length === 1 ? 'Like' : dataPostOfUserBySharePostId.postLikes.length === 0 ? 'Like' : 'Likes'}</span>
                        {openPeopleLikedYourPost &&
                            <div className='bg-people-likes-post-list'>
                                <>
                                    <div className='bg-onclick-to-close-people-likes-post-list' onClick={() => setOpenPeopleLikeYourPost(false)}></div>
                                    <div className='container-people-likes-post-list'>
                                        <div className='container-header-in-people-likes-post-list'>
                                            <p>People liked your post</p>
                                            <div onClick={() => setOpenPeopleLikeYourPost(false)} className='container-icon-xmark-in-container-header-in-people-likes-post-list'>
                                                <HiOutlineXMark className='icon-xmark-in-container-icon-xmark-in-container-header-in-people-likes-post-list' />
                                            </div>
                                        </div>
                                        <div className='container-center-in-people-likes-post-list'>
                                            {dataPostOfUserBySharePostId.postLikes.map((e, index) => (
                                                <PeopleLikedYourPost key={index} UserIdToLikeInPost={e} dataForUser={dataForUser} />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            </div>
                        }
                    </div>
                    <div className='comment-icon-container' onClick={() => setOpenComments(!openComments)}>
                        <VscComment className='comment-icon' />&nbsp;&nbsp;&nbsp;<span className='span-comment-icon-hover'>Comment</span>
                    </div>
                    <div className='share-icon-container' onClick={() => setOpenSharePostPopup(true)}>
                        <CiShare1 className='share-icon' />&nbsp;&nbsp;&nbsp;<span className='span-share-icon-hover'>Share</span>
                    </div>
                    {openSharePostPopup &&
                        <>
                            <div className='container-share-post-in-container-icons-in-content-footer'>
                                <div onClick={closeSharePostPopup} className='bg-on-click-to-close-share-post-popup'></div>
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
                                    <div className='body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                        <div className='container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                            <Link to='id' className='container-img-profile-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${dataOfUserActiveByUserId.image}`} alt='imgProfile' />
                                            </Link>
                                            <div className='container-fullname-of-user-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <Link to='id' className='text-decoration-in-container-fullname-of-user-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <p>{dataOfUserActiveByUserId.fullname}</p>
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
                                            {dataPostOfUserBySharePostId.postImgs.length !== 0
                                                ?
                                                <div className='content-center-in-post-of-users-in-container-post-of-user-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
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
                                                    <Link to='id' className='container-img-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${DataOfUserByUserId.image}`} alt='imgProfile' />
                                                    </Link>
                                                    <div className='container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                        <Link to='id' className='text-decoration-none-in-container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                            <p>{DataOfUserByUserId.fullname}</p>
                                                        </Link>
                                                        <div className='container-modifydate-post-in-container-fullname-of-user-in-container-user-data-in-container-data-of-user-post-to-share-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                            <p>{dataPostOfUserBySharePostId.postModifyDate}</p>
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
                                        <button>Post</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='container-comments-of-users'>
                {openComments &&
                    <>
                        {commentOfUsers.filter((e) => {
                            return e.postIdToComment === dataPostOfUserBySharePostId.postId;
                        }).map((e, index) => (
                            <Comment key={index} dataForUser={dataForUser} activeUserId={activeUserId} commentId={e.commentId} userIdToComment={e.userIdToComment} commentMsgs={e.commentMsgs} commentImg={e.commentImg} modifyDate={e.modifyDate} />
                        ))}
                    </>
                }
            </div>
            <div className='create-comment-container-in-post-of-users'>
                <Link to='/profile' className='container-img-profile-in-create-comment-container-in-post-of-users'>
                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${dataOfUserActiveByUserId.image}`} alt='imgProfileUser' />
                </Link>
                <div className='write-comment-container-in-create-comment-container-in-post-of-users'>
                    <form encType='multipart/form-data'>
                        <input type='text' placeholder='Write your comment...' ref={inputCommentRef} value={commetMsg} onChange={(e) => setCommentMsg(e.target.value)} />
                        <input type='submit' style={{ display: 'none' }}></input>
                        <div className='emoji-picker-container-in-create-comment-container-in-post-of-users' onClick={() => setOpenEmojiPickerInComment(!openEmojiPickerInComment)}>
                            <BsEmojiSmile className='emoji-picker-icon-in-create-comment-container-in-post-of-users' />
                        </div>
                        <div className='photo-upload-container-in-create-comment-container-in-post-of-users' onClick={() => selectFileIconRef.current.click()}>
                            <SlPaperClip className='photo-upload-icon-in-create-comment-container-in-post-of-users' />
                            <input ref={selectFileIconRef} onChange={(e) => selectFileToUploadInComment(e)} onClick={(e) => e.target.value = null} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
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