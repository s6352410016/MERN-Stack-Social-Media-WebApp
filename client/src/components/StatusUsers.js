import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { RotatingLines } from 'react-loader-spinner';

const StatusUsers = () => {
  const [changeIcon, setChangeIcon] = useState(false);
  const [loadingEffectFollow, setLoadingEffectFollow] = useState(false);

  const followUser = () => {
    setLoadingEffectFollow(true);
    setTimeout(() => {
      setLoadingEffectFollow(false);
      setChangeIcon(true);
    }, 1000);
  }

  return (
    <div className='container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
      <Link to='/id' className='container-user-profile-img-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/user10.png`} alt='profileImg' />
        <div className='status-of-user-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'></div>
      </Link>
      <Link to='/id' className='container-user-fullname-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        <p>ประยุทธ์ จันทร์โอชา</p>
      </Link>
      <div onClick={followUser} className='container-button-follow-or-unfollow-in-container-status-users-in-container-body-in-container-user-online-list-in-content-right-in-body'>
        {loadingEffectFollow
          ?
          <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="50%" visible={true} />
          :
          <FontAwesomeIcon icon={changeIcon ? faUserCheck : faUserPlus} className='follower-user-icon' />
        }
      </div>
    </div>
  );
}

export default StatusUsers;