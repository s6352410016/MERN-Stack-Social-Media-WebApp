import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonChatMsg = () => {
    return (
        <div className='container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
            <div className='container-profile-user-img-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                <Skeleton circle={true} height={50} width={50} className='style-skeleton-chat'/>
            </div>
            <div className='fix-layout-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                <div className='container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                    <p className='msg-text-chat'><Skeleton height={15} width={150} className='style-skeleton-chat-msg'/></p>
                    <div className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <p className='modifydate-chat-text'><Skeleton height={15} width={50} className='style-skeleton-chat-msg-modifydate'/></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonChatMsg;