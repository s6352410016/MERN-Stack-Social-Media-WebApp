import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SocketIOContext } from './SocketContext';

const SearchPeopleChat = ({ setChatIdToCreateChatMsg, inputChatMshRef, setSelectedChat, setSearchPeopleChat, setSearchPeopleInMoblieMsg, setOpenSearchPeopleInMobile, setCreateChatStatus, createChatStatus, userDataInActive, userId, image, firstname, lastname }) => {
  const { socket } = useContext(SocketIOContext);

  const createChat = () => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        senderId: userDataInActive._id,
        receiverId: userId
      })
    }).then((res) => {
      if (res.status === 201) {
        socket.current?.emit('createChat');
        setSelectedChat(null);
        setCreateChatStatus(!createChatStatus);
        setOpenSearchPeopleInMobile(false);
        setSearchPeopleInMoblieMsg('');
        setSearchPeopleChat('');
        inputChatMshRef.value = '';
      } else {
        setSelectedChat(null);
        setCreateChatStatus(!createChatStatus);
        setOpenSearchPeopleInMobile(false);
        setSearchPeopleInMoblieMsg('');
        setSearchPeopleChat('');
        inputChatMshRef.value = '';
        setChatIdToCreateChatMsg("");
      }
    });
  }

  return (
    <Link onClick={createChat} className='serach-result-text-decoration-none'>
      <div className='search-result-container' style={{ height: '70px', gap: '10px' }}>
        <div className='search-result-image-user' style={{ width: '55px', height: '50px' }}>
          <div className='search-result-image-container' style={{ width: '100%', height: '100%' }}>
            <img className='search-img-user' style={{ borderRadius: '50%' }} src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!image ? 'profileImgDefault.jpg' : image}`} alt='imageUser' />
          </div>
        </div>
        <div className='search-result-fullname-user'>
          <b className='search-fullname-user'>{firstname} {lastname}</b>
        </div>
      </div>
    </Link>
  );
}

export default SearchPeopleChat;