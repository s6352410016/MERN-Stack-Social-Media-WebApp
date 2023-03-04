import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonUserProfileInMedia = () => {
    return (
        <div className='container-user-profile-in-container-content-right-in-body'>
            <div className='container-img-container-user-profile-in-container-content-right-in-body'>
                <Skeleton circle={true} height={50} width={50} />
            </div>
            <div className='container-fullname-active-user-in-container-user-profile-in-container-content-right-in-body'>
                <Skeleton height={15} width={200} />
            </div>
        </div>
    );
}

export default SkeletonUserProfileInMedia;