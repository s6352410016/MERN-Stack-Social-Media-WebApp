import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare, faTrash , faCircleArrowRight , faCircleArrowLeft} from '@fortawesome/free-solid-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
                <div className='content-center-in-post-of-users'>
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
            <div className='content-center-in-post-of-users'>
                <div className='container-img-post-of-users'>
                    <Carousel showThumbs={false} showStatus={false}>         
                        <img className='img-post-style' src='https://cdn.pixabay.com/photo/2022/03/23/18/56/beach-7087722_640.jpg' alt='imgPost'/>           
                        <img className='img-post-style' src='https://cdn.pixabay.com/photo/2022/03/11/10/55/couple-7061929__340.jpg' alt='imgPost'/>
                        <img className='img-post-style' src='https://cdn.pixabay.com/photo/2022/10/25/19/55/beach-7546731__340.jpg' alt='imgPost'/>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Posts;