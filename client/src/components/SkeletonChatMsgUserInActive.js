import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonChatMsgUserInActive = () => {
    return (
        <div className='container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page active'>
            <div className='container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                <p style={{ color: '#fff' }} className='msg-text-chat'><Skeleton height={15} width={200} className='style-skeleton-chat-msg'/></p>
                <div className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                    <p style={{ color: '#fff' }} className='modifydate-chat-text'><Skeleton height={15} width={50} className='style-skeleton-chat-msg-modifydate'/></p>
                </div>
            </div>
        </div>
    );
}

export default SkeletonChatMsgUserInActive;