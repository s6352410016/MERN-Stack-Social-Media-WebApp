import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonChatUserList = () => {
    return (
        <div className='container-user-chat-list-profile'>
            <div className='container-profile-img-in-container-user-chat-list-profile'>
                <Skeleton circle={true} height={50} width={50} className='style-skeleton-chat'/>
            </div>
            <div className='container-profile-fullname-in-container-user-chat-list-profile'>
                <p><Skeleton height={15} width={150} /></p>
                <span><Skeleton height={15} width={80} /></span>
            </div>
        </div>
    );
}

export default SkeletonChatUserList;