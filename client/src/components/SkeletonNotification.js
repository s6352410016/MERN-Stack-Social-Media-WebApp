import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonNotification = () => {
  return (
    <div className='notification-users-container' id='no-bg-skeleton-load-in-notification'>
      <div className='notification-users-header'>
        <div className='notification-users-header-container'>
          <Skeleton circle={true} height={50} width={50} className='style-skeletion-img-notification'/>
        </div>
      </div>
      <div className='notification-users-body'>
        <div className='notofication-username'>
          <span className='span-username'><b><Skeleton height={15} width={150} className='style-skeleton-fullname-user'/></b></span>
        </div>
        <div className='notification-user-content'>
          <span className='span-user-content'><Skeleton height={15} width={200} className='style-skeleton-content-user'/></span>
        </div>
        <div className='notification-modify-date'>
          <span className='span-user-modify-date'><Skeleton height={15} width={100} className='style-skeleton-modifidate'/></span>
        </div>
      </div>
    </div>
  );
}

export default SkeletonNotification;