import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ChatMsg = ({ fullnameUserChat, userInfo, senderId, chatMsg, chatImages, createdAt }) => {
  const [userDataBySenderId, setUserDataBySenderId] = useState({});
  const chatRef = useRef();

  useEffect(() => {
    setUserDataBySenderId(userInfo.find((e) => e._id === senderId));
  });

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: 'smooth' , block: 'start'});
    // chatRef?.current?.scrollIntoView(true);
  }, []);

  return (
    <div ref={chatRef} className='container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
      <Link to={`/profile/${userDataBySenderId._id}`} className='container-profile-user-img-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataBySenderId.profilePicture ? 'profileImgDefault.jpg' : userDataBySenderId.profilePicture}`} alt='userProfileImg' />
      </Link>
      <div className='fix-layout-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
        {chatImages.length === 0 && chatMsg !== '' &&
          <>
            <div className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <Link style={{textDecoration: "none"}} to={`/profile/${userDataBySenderId._id}`}>
                <p className="fullnameUserChat-style-fix">{fullnameUserChat}</p>
              </Link>
              <p className='modifydate-chat-text'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
            </div>
            <div style={{ borderRadius: "1.3rem" }} className='container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <p className='msg-text-chat'>{chatMsg}</p>
            </div>
          </>
        }
        {chatImages.length !== 0 && chatMsg === '' &&
          <>
            <div className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <Link style={{textDecoration: "none"}} to={`/profile/${userDataBySenderId._id}`}>
                <p className="fullnameUserChat-style-fix">{fullnameUserChat}</p>
              </Link>
              <p className='modifydate-chat-text'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
            </div>
            <div style={{ gridTemplateColumns: `repeat(${chatImages.length > 3 ? '3' : chatImages.length} , 150px)` }} className='container-chat-img-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              {chatImages.length !== 0 && chatMsg === '' &&
                chatImages.map((e, index) => (
                  <div key={index} className='container-chat-img-width-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/chatImg/${e}`} alt='chatImg' />
                  </div>
                ))
              }
            </div>
          </>
        }
        {chatImages.length !== 0 && chatMsg !== '' &&
          <>
            <div className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <Link style={{textDecoration: "none"}} to={`/profile/${userDataBySenderId._id}`}>
                <p className="fullnameUserChat-style-fix">{fullnameUserChat}</p>
              </Link>
              <p className='modifydate-chat-text'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
            </div>
            <div style={{ gridTemplateColumns: `repeat(${chatImages.length > 3 ? '3' : chatImages.length} , 150px)` }} className='container-chat-img-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              {chatImages.map((e, index) => (
                <div key={index} className='container-chat-img-width-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                  <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/chatImg/${e}`} alt='chatImg' />
                </div>
              ))}
            </div>
            <div style={{ borderRadius: "1.3rem", marginTop: "5px" }} className='container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <p className='msg-text-chat'>{chatMsg}</p>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default ChatMsg;