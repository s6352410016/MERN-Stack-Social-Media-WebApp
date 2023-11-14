import React from 'react';
import { Link } from 'react-router-dom';

const StatusUsers = ({active, userId, image, firstname, lastname }) => {
  return (
    <div className='container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
      <Link to={`/profile/${userId}`} className='container-user-profile-img-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!image ? 'profileImgDefault.jpg' : image}`} alt='profileImg' />
        {active === true
          ?
          <div className='status-of-user-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body active'></div>
          :
          active === undefined || active === false
            ?
            <div className='status-of-user-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'></div>
            :
            <></>
        }
      </Link>
      <Link to={`/profile/${userId}`} className='container-user-fullname-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        <p>{firstname} {lastname}</p>
        <span>{active ? 'Online' : 'Offline'}</span>
      </Link>
    </div>
  );
}

export default StatusUsers;