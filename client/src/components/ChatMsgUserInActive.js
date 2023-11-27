import React, { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const ChatMsgUserInActive = ({ senderId, userInfo, chatMsg, chatImages, createdAt }) => {
    const chatRef = useRef();
    const [userDataBySenderId, setUserDataBySenderId] = useState({});

    useEffect(() => {
        chatRef?.current?.scrollIntoView({behavior: 'smooth' , block: 'start'});
    }, []);

    useEffect(() => {
        setUserDataBySenderId(userInfo.find((e) => e._id === senderId));
    });

    return (
        <div style={{ flexDirection: "row", alignItems: "flex-start" }} ref={chatRef} className='container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page active'>
            {chatImages.length === 0 && chatMsg !== '' &&
                <>
                    <div style={{ justifyContent: "flex-end", alignItems: "flex-end" }} className='fix-layout-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <div style={{ width: "auto" }} className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                            <Link style={{ textDecoration: "none" }} to={`/profile/${userDataBySenderId._id}`}>
                                <p className="fullnameUserChat-style-fix">{userDataBySenderId.firstname}</p>
                            </Link>
                            <p style={{ color: '#A0A0A0' }} className='modifydate-chat-text'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
                        </div>
                        <div style={{ backgroundColor: '#1982FF', borderRadius: "1.3rem" }} className='container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                            <p style={{ color: '#fff' }} className='msg-text-chat'>{chatMsg}</p>
                        </div>
                    </div>
                    <Link to={`/profile/${userDataBySenderId._id}`} className='container-profile-user-img-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataBySenderId.profilePicture ? 'profileImgDefault.jpg' : userDataBySenderId.profilePicture}`} alt='userProfileImg' />
                    </Link>
                </>
            }
            {chatImages.length !== 0 && chatMsg === '' &&
                <>
                    <div style={{ justifyContent: "flex-end", alignItems: "flex-end" }} className='fix-layout-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <div style={{ width: "auto" }} className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                            <Link style={{ textDecoration: "none" }} to={`/profile/${userDataBySenderId._id}`}>
                                <p className="fullnameUserChat-style-fix">{userDataBySenderId.firstname}</p>
                            </Link>
                            <p style={{ color: '#A0A0A0' }} className='modifydate-chat-text'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
                        </div>
                        <div style={{ gridTemplateColumns: `repeat(${chatImages.length > 3 ? '3' : chatImages.length} , 150px)` }} className='container-chat-img-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page active'>
                            {chatImages.map((e, index) => (
                                <div key={index} className='container-chat-img-width-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/chatImg/${e}`} alt='chatImg' />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link to={`/profile/${userDataBySenderId._id}`} className='container-profile-user-img-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataBySenderId.profilePicture ? 'profileImgDefault.jpg' : userDataBySenderId.profilePicture}`} alt='userProfileImg' />
                    </Link>
                </>
            }
            {chatImages.length !== 0 && chatMsg !== '' &&
                <>
                    <div style={{ justifyContent: "flex-end", alignItems: "flex-end" }} className='fix-layout-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <div style={{ width: "auto" }} className='modifydate-chat-msg-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                            <Link style={{ textDecoration: "none" }} to={`/profile/${userDataBySenderId._id}`}>
                                <p className="fullnameUserChat-style-fix">{userDataBySenderId.firstname}</p>
                            </Link>
                            <p style={{ color: '#A0A0A0' }} className='modifydate-chat-text'>{format(new Date(createdAt), "dd/MM/yyyy EEEE HH:mm")}</p>
                        </div>
                        <div style={{ gridTemplateColumns: `repeat(${chatImages.length > 3 ? '3' : chatImages.length} , 150px)` }} className='container-chat-img-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page active'>
                            {chatImages.map((e, index) => (
                                <div key={index} className='container-chat-img-width-in-container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/chatImg/${e}`} alt='chatImg' />
                                </div>
                            ))}
                        </div>
                        <div style={{ backgroundColor: '#1982FF', borderRadius: "1.3rem", marginTop: "5px" }} className='container-msg-chat-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                            <p style={{ color: '#fff' }} className='msg-text-chat'>{chatMsg}</p>
                        </div>
                    </div>
                    <Link to={`/profile/${userDataBySenderId._id}`} className='container-profile-user-img-in-container-profile-user-in-container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                        <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataBySenderId.profilePicture ? 'profileImgDefault.jpg' : userDataBySenderId.profilePicture}`} alt='userProfileImg' />
                    </Link>
                </>
            }
        </div >
    );
}

export default ChatMsgUserInActive;