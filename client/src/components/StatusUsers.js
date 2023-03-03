import React from 'react';
import { Link } from 'react-router-dom';
const StatusUsers = ({userId , image , fullname}) => {
  return (
    <div className='container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
      <Link to='/id' className='container-user-profile-img-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${image}`} alt='profileImg' />
        <div className='status-of-user-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body active'></div>
      </Link>
      <Link to='/id' className='container-user-fullname-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        <p>{fullname}</p>
        <span>Just now</span>
      </Link>
    </div>
  );
}

export default StatusUsers;