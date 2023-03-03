import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonStatusUsers = () => {
    return (
        <div className='container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body hover-none'>
            <div className='container-user-profile-img-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
                <Skeleton circle={true} height={50} width={50} />
            </div>
            <div className='container-user-fullname-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
                <p><Skeleton height={15} width={200} /></p>
                <span><Skeleton height={15} width={80} /></span>
            </div>
        </div>
    );
}

export default SkeletonStatusUsers;