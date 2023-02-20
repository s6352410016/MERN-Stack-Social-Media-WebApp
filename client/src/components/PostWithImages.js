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

const PostWithImages = () => {
    const selectFileIconRef = useRef();
    const inputCommentRef = useRef();
    const inputInSharePostRef = useRef();

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
    const [msgInSharePost , setMsgInSharePost] = useState('');
    const [inputMsgInSharePostCursorPosition , setInputMsgInSharePostCursorPosition] = useState();

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

    const selectFileToUploadInComment = (e) => {
        if (e.target.files.length > 0) {
            const imgUrl = URL.createObjectURL(e.target.files[0]);
            setPreviewImgFile(imgUrl);
            setOpenImgPreview(true);
        }
    }

    const clearFileToSelect = () => {
        setPreviewImgFile('');
        setOpenImgPreview(false);
    }

    const closeSharePostPopup = () => {
        setOpenSharePostPopup(false);
        setOpenEmojiPickerInSharePost(false);
    }

    useEffect(() => {
        inputCommentRef.current.selectionEnd = cursorPosition;

        if(openSharePostPopup){
            inputInSharePostRef.current.selectionEnd = inputMsgInSharePostCursorPosition;
        }

    }, [cursorPosition , inputMsgInSharePostCursorPosition]);

    return (
        <div className='container-post-of-users'>
            <div className='content-header-in-post-of-users'>
                <Link to='id' className='link-container-of-img'>
                    <div className='container-of-img-profile-users'>
                        <div className='container-width-full-img'>
                            <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/user1.png`} alt='profileImg' />
                        </div>
                    </div>
                </Link>
                <div className='content-center-in-header-in-post-of-users'>
                    <Link to='id' className='link-in-container-of-fullname-user'><p className='fullname-of-post-users'>Bell bunlung</p></Link>
                    <p className='modify-date-post-of-users'>15 minutes ago.</p>
                </div>
                <div className='icon-settings-post-of-users'>
                    <div className='container-icon-three-dots' onClick={() => setSettingInPostPopup(!settingInPostPopup)} >
                        <FontAwesomeIcon icon={faEllipsis} className='icon-three-dots-horizontal' />
                    </div>
                    {settingInPostPopup &&
                        <>
                            <div className='bg-toggle-onclick-in-tree-dots' onClick={() => setSettingInPostPopup(false)}></div>
                            <div className='setting-post-popup'>
                                <div className='icon-edit-post' onClick={() => setSettingInPostPopup(false)}>
                                    <FontAwesomeIcon className='icon-edit-post-style' icon={faPenToSquare} />&nbsp;&nbsp;<span className='span-in-post-style'>Edit post</span>
                                </div>
                                <div className='icon-delete-post' onClick={() => setSettingInPostPopup(false)}>
                                    <FontAwesomeIcon className='icon-delete-post-style' icon={faTrash} />&nbsp;&nbsp;<span className='span-in-post-style'>Delete post</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='message-in-post-container'>
                <p>Holy Fucking Shit!!!.</p>
            </div>
            <div className='content-center-in-post-of-users'>
                <div className='container-img-post-of-users'>
                    <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]} className="mySwiper">
                        <SwiperSlide><img src='https://cdn.pixabay.com/photo/2023/01/27/06/17/pheasant-7747830_960_720.jpg' alt='postImg' /></SwiperSlide>
                        <SwiperSlide><img src='https://cdn.pixabay.com/photo/2022/09/07/17/26/vintage-pocket-watch-7439233_960_720.jpg' alt='postImg' /></SwiperSlide>
                        <SwiperSlide><img src='https://cdn.pixabay.com/photo/2022/12/25/04/05/living-room-7676789_640.jpg' alt='postImg' /></SwiperSlide>
                        <SwiperSlide><img src='https://cdn.pixabay.com/photo/2023/02/14/18/55/flowers-7790227_640.jpg' alt='postImg' /></SwiperSlide>
                        <SwiperSlide><img src='https://cdn.pixabay.com/photo/2023/02/04/09/20/castle-7766794__340.jpg' alt='postImg' /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
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
                        <span onClick={() => setOpenPeopleLikeYourPost(true)}>10 Likes</span>
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
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
                                            <PeopleLikedYourPost />
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
                                                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/user1.png`} alt='imgProfile' />
                                            </Link>
                                            <div className='container-fullname-of-user-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                <Link to='id' className='text-decoration-in-container-fullname-of-user-in-container-user-data-in-body-share-content-post-in-container-share-content-post-in-container-icons-in-content-footer'>
                                                    <p>Bell bunlung</p>
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
                                                        <EmojiPicker onEmojiClick={EmojiClickInSharePost}/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
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
                        <Comment />
                    </>
                }
            </div>
            <div className='create-comment-container-in-post-of-users'>
                <Link to='/profile' className='container-img-profile-in-create-comment-container-in-post-of-users'>
                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/user1.png`} alt='imgProfileUser' />
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
                            <div className='style-emoji-picker-fix-in-write-comment-container-in-create-comment-container-in-post-of-users'>
                                <EmojiPicker onEmojiClick={EmojiClickInCreateComment} />
                            </div>
                        </>
                    }
                </div>
            </div>
            {openPreviewImg &&
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

export default PostWithImages;