import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonNotification = () => {
  return (
    <div className='notification-users-container' id='no-bg-skeleton-load-in-notification'>
      <div className='notification-users-header'>
        <div className='notification-users-header-container'>
          <Skeleton circle={true} height={50} width={50}/>
        </div>
      </div>
      <div className='notification-users-body'>
        <div className='notofication-username'>
          <span className='span-username'><b><Skeleton height={15} width={150}/></b></span>
        </div>
        <div className='notification-user-content'>
          <span className='span-user-content'><Skeleton height={15} width={200}/></span>
        </div>
        <div className='notification-modify-date'>
          <span className='span-user-modify-date'><Skeleton height={15} width={100}/></span>
        </div>
      </div>
    </div>
  );
}

export default SkeletonNotification;