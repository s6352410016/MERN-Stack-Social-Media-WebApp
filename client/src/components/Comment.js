import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Comment = () => {
    return (
        <div className='container-comments-of-user-detail-in-container-comments-of-users'>
            <div className='box-of-container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                <Link to='id' className='container-img-profile-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <img src={require('../images/allUserProfileImg/user9.png')} alt='imgProfile' />
                </Link>
            </div>
            <div className='container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>
                <div className='container-fix-fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <Link to='id' className='fullname-of-user-comment-in-container-comments-of-user-detail-in-container-comments-of-users'>
                        <p className='fullname-of-users-in-container-content-comment-of-user-in-container-comments-of-user-detail-in-container-comments-of-users'>Alex Jacob</p>
                    </Link>
                    <span>5 Minutes</span>
                </div>
                <div className='container-comment-msg-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <p>Hello...++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++</p>
                </div>
            </div>
            <div className='container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                <div className='container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users'>
                    <FontAwesomeIcon className='icon-dots-vertical-in-container-icon-dots-vertical-in-container-options-comments-in-container-comments-of-user-detail-in-container-comments-of-users' icon={faEllipsisVertical}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    );
}

export default Comment;