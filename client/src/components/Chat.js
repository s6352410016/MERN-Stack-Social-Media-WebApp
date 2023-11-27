import React, { useState, useEffect, useRef, useContext } from 'react';
import SkeletonSearchResult from './SkeletonSearchResult';
import SearchResult from './SearchResult';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faXmark, faMagnifyingGlass, faBell, faComment, faChevronDown, faUserPen, faArrowRightFromBracket, faPaperPlane, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import SkeletonNotification from './SkeletonNotification';
import Notification from './Notification';
import SkeletonChatsPopup from './SkeletonChatsPopup';
import ChatPopup from './ChatPopup';
import SkeletonUserProfileInHambuger from './SkeletonUserProfileInHambuger';
import { useNavigate, Link } from 'react-router-dom';
import './css/MediaPage.css';
import SearchPeopleChat from './SearchPeopleChat';
import ChatUserList from './ChatUserList';
import ChatMsg from './ChatMsg';
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from 'emoji-picker-react';
import ChatMsgUserInActive from './ChatMsgUserInActive';
import SkeletonChatUserList from './SkeletonChatUserList';
import SkeletonChatMsg from './SkeletonChatMsg';
import SkeletonChatMsgUserInActive from './SkeletonChatMsgUserInActive';
import { SocketIOContext } from './SocketContext';
import { RotatingLines } from 'react-loader-spinner';

const Chat = ({ setLogoutStatus }) => {
  const { socket } = useContext(SocketIOContext);

  const navigate = useNavigate();
  const inputSelectFileToCreateMsgChat = useRef();
  const inputTextCreateChatMsgRef = useRef();
  const inputChatMshRef = useRef();
  const closeFindUserChat = useRef();
  const userDataInActiveRef = useRef(null);

  const [searchResult, setSearchResult] = useState('');
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [showSkeletonSearchResult, setShowSkeletonSearchResult] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [alertStatus, setAlertStatus] = useState(false);
  const [countAlert, setCountAlert] = useState(0);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [dataUserNotification, setDataUserNotification] = useState([]);
  const [showSkeletonNotification, setShowSkeletonNotification] = useState(true);
  const [openChats, setOpenChats] = useState(false);
  const [openChatSetting, setOpenChatSetting] = useState(false);
  const [showSkeletonChatsPopup, setShowSkeletonChatsPopup] = useState(true);
  const [openMenus, setOpenMenus] = useState(false);
  const [userDataInActive, setUserDataInActive] = useState({});
  const [showSkeletonUserProfileInHamburger, setShowSkeletonUserProfileInHamburger] = useState(true);
  const [userData, setUserData] = useState('');
  const [followAndUnFollow, setFollowAndUnFollow] = useState(false);
  const [createPostStatus, setCreatePostStatus] = useState(false);
  const [deletePostStatus, setDeletePostStatus] = useState(false);
  const [searchPeopleChat, setSearchPeopleChat] = useState('');
  const [openSearchPeopleChat, setOpenSearchPeopleChat] = useState(false);
  const [showSkeletonSearchPeopleChat, setShowSkeletonSearchPeopleChat] = useState(true);
  const [createChatMsg, setCreateChatMsg] = useState('');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [objURLFileImg, setObjURLFileImg] = useState([]);
  const [fileImg, setFileImg] = useState([]);
  const [disableButtonSendMsg, setDisableButtonSendMsg] = useState(true);
  const [showSkeletonChatUserList, setShowSkeletonChatUserList] = useState(true);
  const [showSkeletonChatMsg, setShowSkeletonChatMsg] = useState(true);
  const [openSearchPeopleInMobile, setOpenSearchPeopleInMobile] = useState(false);
  const [searchPeopleInMoblieMsg, setSearchPeopleInMoblieMsg] = useState('');
  const [createChatStatus, setCreateChatStatus] = useState(false);
  const [chatOfUser, setChatOfUser] = useState([]);
  const [chatMsg, setChatMsg] = useState([]);
  const [createMsgStatus, setCreateMsgStatus] = useState(false);
  const [chatIdToCreateChatMsg, setChatIdToCreateChatMsg] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [openProfileStatus, setOpenProfileStatus] = useState(false);
  const [fullnameOfuserToSearch, setFullnameOfuserToSearch] = useState([]);
  const [fullnameUserChat, setFullnameUserChat] = useState("");
  const [fixScroll, setFixScroll] = useState(false);
  const [chatData, setChatData] = useState({});
  const [chatUserData, setChatUserData] = useState("");
  const [effectWhileDeleteChat, setEffectWhileDeleteChat] = useState(false);
  const [openDeleteChat, setOpenDeleteChat] = useState(false);
  const [deleteMsgInChatStatus, setDeleteMsgInChatStatus] = useState(false);
  const [isBlockChat, setIsBlockChat] = useState(true);

  const closeDropdown = () => {
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    setOpenSearchPeopleChat(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.remove('close-popup');
  }

  const SearchResultPopup = () => {
    setOpenSearchResult(!openSearchResult);
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const notificationPopup = () => {
    if (dataUserNotification.length > 0) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/updateUserToReadNotification`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userIdToRead: userDataInActive._id
        })
      }).then((res) => {
        if (res.status === 200) {
          // socket.current?.emit('updatedNotification');
          setCountAlert(0);
          setAlertStatus(false);
        }
      });
    }

    setOpenNotifications(!openNotifications);
    setOpenMenus(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const chatsPopup = () => {
    // setOpenChats(!openChats);
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    // const closePopup = document.getElementById('close-popup');
    // closePopup.classList.add('close-popup');
  }

  const dropdownPopup = () => {
    setOpenMenus(!openMenus);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    setLogoutStatus(true);
  }

  const showHiddenMenuInHeader = () => {
    const hiddenContentInHeaderPopup = document.querySelector('.hidden-content-in-header-popup');
    hiddenContentInHeaderPopup.classList.toggle('active');
  }

  const openPageSearchPeopleInHamburger = () => {
    navigate('/search-people', {
      state: {
        userInfo,
        userData,
        userDataInActive
      }
    });
  }

  const openPageNotificationsInHamburger = () => {
    navigate('/notifications', {
      state: {
        dataUserNotification,
        userInfo
      }
    });
  }

  const openSearchPeopleChatPopup = () => {
    setOpenSearchPeopleChat(!openSearchPeopleChat);
    setOpenSearchPeopleInMobile(true);

    // const closePopup = document.getElementById('close-popup');
    // closePopup.classList.add('close-popup');
  }

  const emojiClick = ({ emoji }) => {
    inputTextCreateChatMsgRef.current.focus();
    const start = createChatMsg.substring(0, inputTextCreateChatMsgRef.current.selectionStart);
    const end = createChatMsg.substring(inputTextCreateChatMsgRef.current.selectionStart);
    const msg = start + emoji + end;
    setCreateChatMsg(msg);
    setCursorPosition(start.length + emoji.length);
  }

  const previewImgToSelectInCreateChat = (e) => {
    if (e.target.files.length > 0) {
      const files = e.target.files;
      const arrFiles = Array.from(files);
      const createUrlFromFiles = arrFiles.map((files) => URL.createObjectURL(files));
      setObjURLFileImg(createUrlFromFiles);
      setFileImg(arrFiles.map((e) => e));
      inputTextCreateChatMsgRef?.current?.focus();
    }
  }

  const clearFileImg = (index) => {
    const newArr = objURLFileImg.filter((e, i) => i !== index);
    const copyFileImg = [...fileImg];
    copyFileImg.splice(index, 1);
    setObjURLFileImg(newArr);
    setFileImg(copyFileImg);
    inputTextCreateChatMsgRef?.current?.focus();
  }

  const clearValueInSearchPeopleMobile = () => {
    setOpenSearchPeopleInMobile(false);
    setSearchPeopleInMoblieMsg('');
  }

  const createMessageChat = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!!createChatMsg && fileImg.length === 0) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createMessage`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          chatId: chatIdToCreateChatMsg,
          senderId: userDataInActive._id,
          chatMsg: createChatMsg
        })
      }).then((res) => {
        if (res.status === 201) {
          setCreateChatMsg('');
          setCreateMsgStatus(!createMsgStatus);
          return res.json();
        }
      }).then((res) => {
        const receiverId = chatOfUser.map((e) => {
          if (e._id === chatIdToCreateChatMsg) {
            return e.members.find((id) => id !== userDataInActive._id);
          }
        }).filter((id) => id !== undefined);
        pushMsgInState(res);
        return socket.current?.emit('createChatMsg', ({ msgData: res, receiverData: receiverId.toString() }));
      });
    }

    if (!createChatMsg && fileImg.length !== 0) {
      formData.append('chatId', chatIdToCreateChatMsg);
      formData.append('senderId', userDataInActive._id);
      fileImg.map((file) => {
        formData.append('chatImg', file);
      });

      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createMessage`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.status === 201) {
          setFileImg([]);
          setObjURLFileImg([]);
          setCreateMsgStatus(!createMsgStatus);
          return res.json();
        }
      }).then((res) => {
        const receiverId = chatOfUser.map((e) => {
          if (e._id === chatIdToCreateChatMsg) {
            return e.members.find((id) => id !== userDataInActive._id);
          }
        }).filter((id) => id !== undefined);
        pushMsgInState(res);
        return socket.current?.emit('createChatMsg', ({ msgData: res, receiverData: receiverId.toString() }));
      });
    }

    if (!!createChatMsg && fileImg.length !== 0) {
      formData.append('chatId', chatIdToCreateChatMsg);
      formData.append('senderId', userDataInActive._id);
      formData.append('chatMsg', createChatMsg);
      fileImg.map((file) => {
        formData.append('chatImg', file);
      });

      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/createMessage`, {
        method: 'POST',
        body: formData
      }).then((res) => {
        if (res.status === 201) {
          setCreateChatMsg('');
          setFileImg([]);
          setObjURLFileImg([]);
          setCreateMsgStatus(!createMsgStatus);
          return res.json();
        }
      }).then((res) => {
        const receiverId = chatOfUser.map((e) => {
          if (e._id === chatIdToCreateChatMsg) {
            return e.members.find((id) => id !== userDataInActive._id);
          }
        }).filter((id) => id !== undefined);
        pushMsgInState(res);
        return socket.current?.emit('createChatMsg', ({ msgData: res, receiverData: receiverId.toString() }));
      });
    }
  }

  const handleChatIdToCreateChatMsg = (chatId, isBlock) => {
    setIsBlockChat(isBlock === true ? false : true);
    setChatIdToCreateChatMsg(chatId);
  }

  const deleteChat = async () => {
    try {
      setEffectWhileDeleteChat(true);
      const chat = chatOfUser.find((chat) => chat?._id === chatIdToCreateChatMsg);
      const receiverUserIdOfChatToDelete = chat?.members.find((member) => member !== userDataInActive?._id);
      await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/deleteMsgByChatId`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ chatId: chatIdToCreateChatMsg })
      });
      socket.current?.emit("deleteMsg", receiverUserIdOfChatToDelete);
      setOpenDeleteChat(false);
      setEffectWhileDeleteChat(false);
      setChatIdToCreateChatMsg("");
      setDeleteMsgInChatStatus(!deleteMsgInChatStatus);
      setIsBlockChat(true);
    } catch (err) {
      console.log(err);
    }
  }

  const pushMsgInState = (msgData) => {
    setChatMsg((prev) => [...prev, msgData]);
  }

  useEffect(() => {
    if(isBlockChat){
      inputTextCreateChatMsgRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition]);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeletonNotification(false);
      setShowSkeletonSearchResult(false);
      setShowSkeletonChatsPopup(false);
      // setShowSkeletonStatusUsers(false);
      setShowSkeletonUserProfileInHamburger(false);
      // setShowSkeletonSearchPeopleChat(false);
      setShowSkeletonChatUserList(false);
      setShowSkeletonChatMsg(false);
    }, 1000);
  }, []);

  useEffect(() => {
    socket.current?.on('getAllUsers', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllUsers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setUserInfo(res);
      });
    });
  }, [followAndUnFollow]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      setUserInfo(res);
    });
  }, [followAndUnFollow]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/authUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if (res.status === 401) {
        window.location.href = '/';
      } else if (res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = '/';
      } else {
        return res.json();
      }
    }).then((res) => {
      setUserData({
        userId: res.userId,
        firstname: res.firstname,
        lastname: res.lastname
      });
    });
  }, []);

  useEffect(() => {
    setUserDataInActive(userInfo.find((e) => e?._id === userData?.userId));
  }, [userData, userInfo]);

  useEffect(() => {
    userDataInActiveRef.current = userDataInActive;
  }, [userDataInActive]);

  useEffect(() => {
    socket.current?.on('notificationServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllNotifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        const filteredNotification = res.filter((e) => e.notificationOfReceiverId.includes(userDataInActiveRef?.current?._id) && e.notificationOfUserId !== userDataInActiveRef?.current?._id);
        const sortedFilteredNotification = filteredNotification.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDataUserNotification(sortedFilteredNotification?.filter((noti) => noti?.isBlock === false));
        setAlertStatus(true);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllNotifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      const filteredNotification = res.filter((e) => e.notificationOfReceiverId.includes(userDataInActiveRef?.current?._id) && e.notificationOfUserId !== userDataInActiveRef?.current?._id);
      const sortedFilteredNotification = filteredNotification.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDataUserNotification(sortedFilteredNotification?.filter((noti) => noti?.isBlock === false));
      setAlertStatus(true);
    });
  }, [userDataInActive]);

  useEffect(() => {
    const countNotification = dataUserNotification.filter((e) => !e.read.includes(userDataInActive?._id));
    setCountAlert(countNotification.length);
  }, [dataUserNotification]);

  useEffect(() => {
    if (!!createChatMsg.trim() && createChatStatus || fileImg.length !== 0 && createChatStatus) {
      setDisableButtonSendMsg(false);
    } else {
      setDisableButtonSendMsg(true);
    }
  }, [createChatMsg, fileImg]);

  useEffect(() => {
    socket.current?.on('createChat', () => {
      setIsBlockChat(true);
      setSelectedChat(null);
      setCreateChatStatus(false);
      setChatIdToCreateChatMsg("");
      setChatMsg([]);
      if (userDataInActive !== undefined && Object.keys(userDataInActive).length !== 0) {
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllChatByUserId/${userDataInActive._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        }).then((res) => {
          setChatOfUser(res);
        });
      }
    });
  }, [createChatStatus, userDataInActive, userData.userId]);

  useEffect(() => {
    if (userDataInActive !== undefined && Object.keys(userDataInActive).length !== 0) {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllChatByUserId/${userDataInActive._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setChatOfUser(res);
      });
    }
  }, [createChatStatus, userDataInActive, userData.userId, deleteMsgInChatStatus]);

  useEffect(() => {
    socket.current?.emit('connected', userDataInActiveRef?.current?._id);
    socket.current?.on('userActive', (usersActive) => {
      if (userInfo.length !== 0) {
        setUserInfo((prev) =>
          prev.map((e) => {
            usersActive.map((user) => {
              if (e._id === user.userId) {
                e.active = user.active;
              }
            });
            return e;
          })
        );
      }
    });

    socket.current?.on('disconnected', (userDisconnect) => {
      setUserInfo((prev) =>
        prev.map((e) => {
          if (e._id === userDisconnect.userId) {
            e.active = userDisconnect.active;
          }
          return e;
        })
      );
    });
  }, [userData.userId, userDataInActive]);

  useEffect(() => {
    setSelectedChat(null);
    setCreateChatStatus(false);
    setChatIdToCreateChatMsg("");
    setChatMsg([]);
    setChatMsg((prev) => prev.filter((msg) => msg?.chatId !== chatIdToCreateChatMsg));
  }, [deleteMsgInChatStatus]);

  useEffect(() => {
    socket?.current?.on('createChatMsg', (msgData) => {
      setChatMsg((prev) => [...prev, msgData]);
    });
    return () => {
      socket?.current?.off("createChatMsg");
    }
  }, []);

  useEffect(() => {
    setUserInfo((prev) => prev.map((e) => {
      if (e.firstname) {
        e.fullname = `${e.firstname} ${e.lastname}`;
      }
      return e;
    }));
  }, [userDataInActive]);

  useEffect(() => {
    setChatData(chatOfUser.find((e) => e._id === chatIdToCreateChatMsg));
    const id = chatData?.members?.find((member) => member !== userDataInActive?._id);
    setChatUserData(userInfo?.find((user) => user?._id === id));
  }, [chatIdToCreateChatMsg, chatData, chatUserData]);

  useEffect(() => {
    inputTextCreateChatMsgRef?.current?.focus();
  }, [chatIdToCreateChatMsg]);

  return (
    <div className='container-chat'>
      <div id='close-popup' onClick={closeDropdown}></div>
      <header className='container-header'>
        <div className='content-left-header'>
          <Link to='/media' className='text-decoration-none'><h2 className='logo-header'>BYNSocial</h2></Link>
        </div>
        <div className='content-center-header'>
          <div className='container-input-header' onClick={SearchResultPopup}>
            <FontAwesomeIcon className='icon-search-input' icon={faMagnifyingGlass} />&nbsp;&nbsp;
            <input className='search-people' type='text' placeholder='Search people' onChange={(e) => setSearchResult(e.target.value)} />
            {openSearchResult &&
              <div className='search-result'>
                {showSkeletonSearchResult
                  ?
                  userInfo.filter((e) => {
                    return searchResult.trim() !== '' ? e.fullname.toLowerCase().includes(searchResult.trim().toLowerCase()) && e.firstname.toLowerCase() !== userDataInActive.firstname && e.lastname.toLowerCase() !== userDataInActive.lastname : '';
                  }).map((e) => (
                    <SkeletonSearchResult key={e?._id} />
                  ))
                  :
                  userInfo.filter((e) => {
                    return searchResult.trim() !== '' ? e.fullname.toLowerCase().includes(searchResult.trim().toLowerCase()) && e.firstname.toLowerCase() !== userDataInActive.firstname && e.lastname.toLowerCase() !== userDataInActive.lastname : '';
                  }).map((e) => (
                    <SearchResult key={e?._id} setOpenProfileStatus={setOpenProfileStatus} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />
                  ))
                }
                {searchResult.trim() === '' && <div className='no-search-result-container'><p className='no-search-result'>Users not found.</p></div>}
              </div>
            }
          </div>
        </div>
        <div className='content-right-header'>
          <div className='container-icons' id='notification-id'>
            <div className='bell-onclick' onClick={notificationPopup}>
              {countAlert !== 0
                ?
                alertStatus &&
                <div style={{ width: countAlert > 8 ? '24px' : '19px' }} className='alert-red-circle'>{countAlert > 9 ? '9+' : countAlert}</div>
                :
                <></>
              }
              <FontAwesomeIcon className='icons-in-content-right-header' icon={faBell} />
            </div>
            {openNotifications &&
              <div className='notification-popup'>
                <div className='notification-header'>
                  <p className='p-notification-header'>Notifications</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='notification-body' style={
                  dataUserNotification.length === 1 ? { height: '100px' } : dataUserNotification.length === 2 ? { height: '200px' } : dataUserNotification.length === 3 ? { height: '300px' } : dataUserNotification.length === 4 ? { height: '400px' } : dataUserNotification.length > 4 ? { height: '400px' } : { height: 'auto' }
                }>
                  {showSkeletonNotification
                    ?
                    dataUserNotification.map((e) => (
                      <SkeletonNotification key={e?._id} />
                    ))
                    :
                    dataUserNotification.map((e) => (
                      <Notification key={e?._id} userInfo={userInfo} notificationOfUserId={e.notificationOfUserId} notificationDetail={e.notificationDetail} createdAt={e.createdAt} />
                    ))
                  }
                  {dataUserNotification.length === 0 && <p className='no-notification'>No notification at this time.</p>}
                </div>
              </div>
            }
          </div>
          <div className='container-icons' id='dropdown-menus-id' onClick={dropdownPopup}>
            <div className='bg-hover-arrow-down'>
              <FontAwesomeIcon className='icons-in-content-right-header fix-icon' icon={faChevronDown} />
            </div>
            {openMenus &&
              <div className='dropdown-menus-class'>
                <Link to={`/profile/${userDataInActive._id}`} className='menus-in-dropdown'>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen} />&nbsp;&nbsp;<span className='text-in-dropdown'>Profile</span>
                </Link>
                <div className='menus-in-dropdown' onClick={signOut}>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faArrowRightFromBracket} />&nbsp;&nbsp;<span className='text-in-dropdown'>Signout</span>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='hamberger-menu-container' style={{ display: 'none' }}>
          <div onClick={showHiddenMenuInHeader} className='hamburger-menu'>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
          </div>
          <div className='hidden-content-in-header-popup'>
            {userDataInActive !== undefined
              ?
              showSkeletonUserProfileInHamburger
                ?
                <SkeletonUserProfileInHambuger />
                :
                <Link to={`/profile/${userDataInActive._id}`} className='container-user-profile-in-hidden-content-in-header-popup'>
                  <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='profileImg' />
                  <div className='container-fullname-in-container-user-profile-in-hidden-content-in-header-popup'>
                    <p>{userDataInActive.firstname} {userDataInActive.lastname}</p>
                  </div>
                </Link>
              :
              <></>
            }
            <div style={{ width: '95%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
            <div onClick={openPageSearchPeopleInHamburger} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icon-search' icon={faMagnifyingGlass} />Search people</p>
            </div>
            <div onClick={openPageNotificationsInHamburger} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-content-right-header' icon={faBell} />Notifications</p>
            </div>
            <Link to={`/profile/${userData.userId}`} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen} />Profile</p>
            </Link>
            <div onClick={signOut} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-dropdown' icon={faArrowRightFromBracket} />Signout</p>
            </div>
            <div style={{ width: '95%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
          </div>
        </div>
      </header >
      <div className='chat-container-in-chat-page'>
        <div className='list-user-chat-container-in-chat-container-in-chat-page'>
          <div onClick={openSearchPeopleChatPopup} style={{ position: 'relative' }} className='container-search-people-to-chat-in-list-user-chat-container-in-chat-container-in-chat-page'>
            <FontAwesomeIcon className='search-icon-in-container-search-people-to-chat-in-list-user-chat-container-in-chat-container-in-chat-page' icon={faMagnifyingGlass}></FontAwesomeIcon>
            <input ref={inputChatMshRef} onChange={(e) => setSearchPeopleChat(e.target.value)} className='input-text-in-container-search-people-to-chat-in-list-user-chat-container-in-chat-container-in-chat-page' type='text' placeholder='Search people to chat' />
            {openSearchPeopleChat &&
              <div className='search-prople-chat' ref={closeFindUserChat}>
                {
                  userInfo.filter((e) => {
                    return searchPeopleChat.trim() !== '' ? e.fullname.toLowerCase().includes(searchPeopleChat.trim().toLowerCase()) && e.firstname.toLowerCase() !== userDataInActive.firstname && e.lastname.toLowerCase() !== userDataInActive.lastname : '';
                  }).map((e) => (
                    <SearchPeopleChat key={e?._id} setIsBlockChat={setIsBlockChat} setChatIdToCreateChatMsg={setChatIdToCreateChatMsg} inputChatMshRef={inputChatMshRef.current} setSelectedChat={setSelectedChat} setSearchPeopleChat={setSearchPeopleChat} setChatOfUser={setChatOfUser} setSearchPeopleInMoblieMsg={setSearchPeopleInMoblieMsg} setOpenSearchPeopleInMobile={setOpenSearchPeopleInMobile} setCreateChatStatus={setCreateChatStatus} createChatStatus={createChatStatus} userDataInActive={userDataInActive} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />
                  ))
                }
                {searchPeopleChat.trim() === '' && <div className='no-search-result-container fix-mobile'><p className='no-search-result'>Users not found.</p></div>}
              </div>
            }
          </div>
          {openSearchPeopleInMobile &&
            <div className='container-search-people-in-mobile' style={{ display: 'none' }}>
              <div onClick={clearValueInSearchPeopleMobile} className='icon-xmark-in-container-search-people-in-mobile'>
                <FontAwesomeIcon icon={faXmark} className='icon-xmark-in-icon-xmark-in-container-search-people-in-mobile'></FontAwesomeIcon>
              </div>
              <div className='search-people-in-container-search-people-in-mobile'>
                <input className='set-color-place-holder' type='text' placeholder='Search people to chat' onChange={(e) => setSearchPeopleInMoblieMsg(e.target.value)} />
                <FontAwesomeIcon className='search-icon-in-container-search-people-to-chat-in-list-user-chat-container-in-chat-container-in-chat-page mobile' icon={faMagnifyingGlass}></FontAwesomeIcon>
              </div>
              <div className='container-show-result-in-search-mobile'>
                {
                  userInfo.filter((e) => {
                    return searchPeopleInMoblieMsg.trim() !== '' ? e.fullname.toLowerCase().includes(searchPeopleInMoblieMsg.trim().toLowerCase()) && e.firstname.toLowerCase() !== userDataInActive.firstname && e.lastname.toLowerCase() !== userDataInActive.lastname : '';
                  }).map((e) => (
                    <SearchPeopleChat key={e?._id} setIsBlockChat={setIsBlockChat} inputChatMshRef={inputChatMshRef.current} setSelectedChat={setSelectedChat} setSearchPeopleChat={setSearchPeopleChat} setChatOfUser={setChatOfUser} setSearchPeopleInMoblieMsg={setSearchPeopleInMoblieMsg} setOpenSearchPeopleInMobile={setOpenSearchPeopleInMobile} setCreateChatStatus={setCreateChatStatus} createChatStatus={createChatStatus} userDataInActive={userDataInActive} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />
                  ))
                }
              </div>
            </div>
          }
          <div className='container-people-list-chat-in-list-user-chat-container-in-chat-container-in-chat-page'>
            {showSkeletonChatUserList
              ?
              chatOfUser.map((e) => (
                <SkeletonChatUserList key={e?._id} />
              ))
              :
              chatOfUser.length !== 0
                ?
                chatOfUser.map((e, index) => (
                  <ChatUserList key={e?._id} isBlock={e?.isBlock} setFullnameUserChat={setFullnameUserChat} chatMsg={chatMsg} handleChatIdToCreateChatMsg={handleChatIdToCreateChatMsg} chatIdToCreateChatMsg={chatIdToCreateChatMsg} selectedChat={selectedChat} setSelectedChat={setSelectedChat} index={index} createMsgStatus={createMsgStatus} setCreateChatStatus={setCreateChatStatus} userDataInActiveId={userDataInActive._id} setChatMsg={setChatMsg} chatId={e._id} userInfo={userInfo} chatOfUserId={e.members.find((e) => e !== userDataInActive._id)} />
                ))
                :
                <div className='fix-style-bunlung' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#353535', fontSize: '1rem', fontWeight: '500' }}>No chat history</div>
            }
          </div>
        </div>
        <div className='chat-msg-user-container-in-chat-container-in-chat-page'>
          {chatIdToCreateChatMsg !== "" &&
            <div className='message-header-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <Link to={`/profile/${chatUserData?._id}`} className='container-profile-img-in-container-user-chat-list-profile'>
                <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!chatUserData?.profilePicture ? 'profileImgDefault.jpg' : chatUserData?.profilePicture}`} alt='userProfileImg' />
                <div className={`active-user-status-in-container-profile-img-in-container-user-chat-list-profile ${chatUserData?.active && 'active'}`}></div>
              </Link>
              <div className='user-info-data-chat'>
                <Link to={`/profile/${chatUserData?._id}`}><p>{chatUserData?.fullname}</p></Link>
                <span>{chatUserData?.active ? 'Online' : 'Offline'}</span>
              </div>
              <div onClick={() => setOpenChatSetting(true)} className='dot-dot-dot-chat-setting'>
                <FontAwesomeIcon icon={faEllipsis} className='icon-three-dots-horizontal' />
              </div>
            </div>
          }
          {openChatSetting &&
            <div className='container-delete-post-in-icon-settings-post-of-users'>
              <div className='bg-onclick-to-close-delete-post-popup-in-icon-settings-post-of-users'></div>
              <div className='container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                <div className='container-header-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                  <p>Chat settings</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div onClick={() => { setOpenDeleteChat(true); setOpenChatSetting(false); }} className='chat-setting-option-delete-chat'>
                  <FontAwesomeIcon icon={faTrash} className='icon-trash' />
                  Delete this chat?
                </div>
                <div className='container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                  <div className='cancel-style'>
                    <button onClick={() => setOpenChatSetting(false)}>Back</button>
                  </div>
                </div>
              </div>
            </div>
          }
          {openDeleteChat &&
            <div className='container-delete-post-in-icon-settings-post-of-users'>
              <div className='bg-onclick-to-close-delete-post-popup-in-icon-settings-post-of-users'></div>
              <div className='container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                <div className='container-header-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                  <p>Are you sure to delete this chat?</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                  <div onClick={() => setOpenDeleteChat(false)} className='container-cancel-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                    <button>Cancel</button>
                  </div>
                  <div onClick={deleteChat} className='container-confirm-button-in-container-body-in-container-delete-post-content-in-container-delete-post-in-icon-settings-post-of-users'>
                    <button>
                      {effectWhileDeleteChat
                        ?
                        <RotatingLines strokeColor="#B9B9B9" strokeWidth="5" animationDuration=".8" width="20%" visible={true} />
                        :
                        'Confirm'
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
          <div className='container-msg-chat-of-user-in-chat-msg-user-container-in-chat-container-in-chat-page'>
            {showSkeletonChatMsg
              ?
              chatMsg.map((e) => {
                if (e?.senderId === userDataInActive?._id) {
                  return <SkeletonChatMsgUserInActive key={e?._id} />;
                } else {
                  return <SkeletonChatMsg key={e?._id} />;
                }
              })
              :
              createChatStatus
                ?
                chatMsg.length !== 0
                  ?
                  chatMsg.map((e) => {
                    if (e?.senderId === userDataInActiveRef?.current?._id && e?.chatId === chatIdToCreateChatMsg) {
                      return <ChatMsgUserInActive key={e?._id} userInfo={userInfo} senderId={e.senderId} createMsgStatus={createMsgStatus} chatMsg={e.chatMsg} chatImages={e.chatImages} createdAt={e.createdAt} />;
                    } else {
                      if (e?.chatId === chatIdToCreateChatMsg) {
                        return <ChatMsg key={e?._id} fullnameUserChat={fullnameUserChat} createMsgStatus={createMsgStatus} userInfo={userInfo} senderId={e.senderId} chatMsg={e.chatMsg} chatImages={e.chatImages} createdAt={e.createdAt} />;
                      }
                    }
                  })
                  :
                  <div className='fix-style-bunlung' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#353535', fontSize: '1rem', fontWeight: '500' }}>No message</div>
                :
                <div className='fix-style-bunlung' style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#353535', fontSize: '1rem', fontWeight: '500' }}>Select chat or start new conversation</div>
            }
          </div>
          {isBlockChat
            ?
            <div className='container-create-msg-chat-in-chat-msg-user-container-in-chat-container-in-chat-page'>
              <form onSubmit={(e) => createMessageChat(e)} style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: objURLFileImg.length !== 0 ? 'flex-end' : 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }} className='create-msg-chat-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                  {objURLFileImg.length !== 0 &&
                    <div className='container-previews-img-in-create-msg-chat-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                      {objURLFileImg.map((e, index) => (
                        <div key={index} className='preview-img-container-in-create-chat-msg'>
                          <img src={e} alt='previewImg' />
                          <div onClick={() => clearFileImg(index)} className='container-icon-clear-img-to-select-in-preview-img-container-in-create-chat-msg'>
                            <FontAwesomeIcon icon={faCircleXmark} className='icon-xmark'></FontAwesomeIcon>
                          </div>
                        </div>
                      ))
                      }
                    </div>
                  }
                  <div className='fix-layout-in-create-msg-chat-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                    <input ref={inputTextCreateChatMsgRef} value={createChatMsg} type='text' placeholder='Type your message' onChange={(e) => setCreateChatMsg(e.target.value)} />
                    <div onClick={() => setOpenEmojiPicker(true)} className='container-icon-in-create-msg-chat-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                      <BsEmojiSmile className='icon-emoji' />
                    </div>
                    <div onClick={() => inputSelectFileToCreateMsgChat.current.click()} className='container-icon-in-create-msg-chat-in-chat-msg-user-container-in-chat-container-in-chat-page'>
                      <SlPaperClip className='icon-clip' />
                      <input multiple name='chatImg' onChange={(e) => previewImgToSelectInCreateChat(e)} onClick={(e) => e.target.value = null} ref={inputSelectFileToCreateMsgChat} type='file' accept='image/png , image/jpeg , image/webp' style={{ display: 'none' }} />
                    </div>
                  </div>
                  {openEmojiPicker &&
                    <>
                      <div className='bg-onclick-to-close-emoji-popup-picker-in-create-comment-container-in-post-of-users' onClick={() => setOpenEmojiPicker(false)}></div>
                      <div className='style-emoji-picker-fix-in-write-comment-container-in-create-comment-container-in-post-of-users'>
                        <EmojiPicker onEmojiClick={emojiClick} />
                      </div>
                    </>
                  }
                </div>
                <button type='submit' disabled={disableButtonSendMsg} className='send-msg-chat-button'>
                  <FontAwesomeIcon icon={faPaperPlane} className='icon-send-msg'></FontAwesomeIcon>
                </button>
              </form>
            </div>
            :
            <div className='style-by-bell' style={{textAlign: "center" , color: "#DE4040" , height: "50px" , borderRadius: "5px" , display: "flex" , alignItems: "center" , justifyContent: "center" , width: "100%" , backgroundColor: "#FFBDBD" , fontWeight: "bold"}}>You has been blocked chat by admin!</div>
          }
        </div>
      </div>
    </div>
  );
}

export default Chat;