import React from 'react';
import {Link} from 'react-router-dom';

const ChatPopup = ({image , fullname , senderChat}) => {
  return (
    <Link to='/chat' className='link-container-chats-of-users'>
      <div className='container-chats-of-users'>
        <div className='content-header-chats-of-users'>
          <div className='container-img-chats-of-users'>
            <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${image}`} alt='userImgProfile'/>
          </div>
        </div>
        <div className='content-center-chats-of-users'>
          <div className='container-fullname-chats-of-users'>
            <p>{fullname}</p>
          </div>
          <div className='container-sender-msg-chats-of-users'>
            <p>{senderChat}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ChatPopup;