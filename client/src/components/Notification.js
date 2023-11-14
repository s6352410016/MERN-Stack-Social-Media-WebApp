import React , {useState , useEffect} from 'react';
import {format} from 'timeago.js';

const Notification = ({userInfo , notificationOfUserId , notificationDetail , createdAt}) => {
  const [dataOfUserByUserId , setDataOfUserByUserId] = useState({});
  
  useEffect(() => {
    setDataOfUserByUserId(userInfo.find((e) => e._id === notificationOfUserId));
  });

  return (
    <div className='notification-users-container'>
      <div className='notification-users-header'>
        <div className='notification-users-header-container'>
          <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!dataOfUserByUserId.profilePicture ? 'profileImgDefault.jpg' : dataOfUserByUserId.profilePicture}`} alt='imageForUser' className='img-notification-user-profile'></img>
        </div>
      </div>
      <div className='notification-users-body'>
        <div className='notofication-username'>
          <span className='span-username'><b>{dataOfUserByUserId.firstname} {dataOfUserByUserId.lastname}</b></span>
        </div>
        <div className='notification-user-content'>
          <span className='span-user-content'>{notificationDetail}</span>
        </div>
        <div className='notification-modify-date'>
          <span className='span-user-modify-date'>{format(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default Notification;