import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonUserProfileInHambuger = () => {
    return (
        <div className='container-user-profile-in-hidden-content-in-header-popup'>
            <Skeleton circle={true} height={40} width={40} />
            <div className='container-fullname-in-container-user-profile-in-hidden-content-in-header-popup'>
                <Skeleton height={13} width={150} />
            </div>
        </div>
    );
}

export default SkeletonUserProfileInHambuger;