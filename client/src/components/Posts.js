import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis , faPenToSquare , faTrash  } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { AiOutlineHeart , AiOutlineShareAlt} from "react-icons/ai";
import { VscComment } from "react-icons/vsc";

const Posts = () => {
    const [settingInPostPopup, setSettingInPostPopup] = useState(false);

    return (
        <div className='container-post-of-users'>
            <div className='content-header-in-post-of-users'>
                <Link to='id' className='link-container-of-img'>
                    <div className='container-of-img-profile-users'>
                        <div className='container-width-full-img'>
                            <img src={require('../images/allUserProfileImg/user1.png')} alt='profileImg' />
                        </div>
                    </div>
                </Link>
                <div className='content-center-in-header-in-post-of-users'>
                    <Link to='id' className='link-in-container-of-fullname-user'><p className='fullname-of-post-users'>Bell bunlung</p></Link>
                    <p className='modify-date-post-of-users'>15 minutes ago.</p>
                </div>
                <div className='icon-settings-post-of-users'>
                    <div className='container-icon-three-dots'>
                        <FontAwesomeIcon icon={faEllipsis} className='icon-three-dots-horizontal' onClick={() => setSettingInPostPopup(!settingInPostPopup)} />
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
                        <div className='box-of-icon-heart-in-container'>
                            <AiOutlineHeart className='heart-icon'/>
                        </div>&nbsp;
                        <span>1,284 Likes</span>
                    </div>
                    <div className='comment-icon-container'>
                        <VscComment className='comment-icon'/>&nbsp;&nbsp;&nbsp;<span className='span-comment-icon-hover'>Comments</span>
                    </div>
                    <div className='share-icon-container'>
                        <AiOutlineShareAlt className='share-icon'/>&nbsp;&nbsp;&nbsp;<span className='span-share-icon-hover'>Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;