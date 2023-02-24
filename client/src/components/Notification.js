import React from 'react';

const Notification = ({image , username , userContent , modifyDate}) => {
  return (
    <div className='notification-users-container'>
      <div className='notification-users-header'>
        <div className='notification-users-header-container'>
          <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${image}`} alt='imageForUser' className='img-notification-user-profile'></img>
        </div>
      </div>
      <div className='notification-users-body'>
        <div className='notofication-username'>
          <span className='span-username'><b>{username}</b></span>
        </div>
        <div className='notification-user-content'>
          <span className='span-user-content'>{userContent}</span>
        </div>
        <div className='notification-modify-date'>
          <span className='span-user-modify-date'>{modifyDate}</span>
        </div>
      </div>
    </div>
  );
}

export default Notification;