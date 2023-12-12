import React, { useEffect, useContext, useRef } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faComment, faChevronDown, faUserPen, faArrowRightFromBracket, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './css/MediaPage.css';
import Notification from './Notification';
import SearchResult from './SearchResult';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import SkeletonPeopleYouMayKnow from './SkeletonPeopleYouMayKnow';
import CreatePost from './CreatePost';
import SkeletonCreatePost from './SkeletonCreatePost';
import SkeletonNotification from './SkeletonNotification';
import SkeletonSearchResult from './SkeletonSearchResult';
import ChatPopup from './ChatPopup';
import SkeletonChatsPopup from './SkeletonChatsPopup';
import Post from './Post';
import SkeletonPost from './SkeletonPost';
import SharePost from './SharePost';
import StatusUsers from './StatusUsers';
import SkeletonStatusUsers from './SkeletonStatusUsers';
import SkeletonUserProfileInMedia from './SkeletonUserProfileInMedia';
import SkeletonUserProfileInHambuger from './SkeletonUserProfileInHambuger';
import { SocketIOContext } from './SocketContext';

const Media = ({ setLogoutStatus }) => {
  const { socket } = useContext(SocketIOContext);
  const userDataInActiveRef = useRef(null);
  const navigate = useNavigate();

  const [userData, setUserData] = useState('');
  const [openMenus, setOpenMenus] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [openChats, setOpenChats] = useState(false);
  const [showSkeletonPeopleYouMayKnow, setShowSkeletonPeopleYouMayKnow] = useState(true);
  const [showSkeletonCreatePost, setShowSkeletonCreatePost] = useState(true);
  const [showSkeletonNotification, setShowSkeletonNotification] = useState(true);
  const [showSkeletonSearchResult, setShowSkeletonSearchResult] = useState(true);
  const [showSkeletonChatsPopup, setShowSkeletonChatsPopup] = useState(true);
  const [showSkeletonUserProfileInHamburger, setShowSkeletonUserProfileInHamburger] = useState(true);
  const [showSkeletionPost, setShowSkeletonPost] = useState(true);
  const [showSkeletonStatusUser, setShowSkeletonStatusUsers] = useState(true);
  const [showSkeletonProfileUser, setShowSkeletonProfileUser] = useState(true);
  const [showIconScrollToTop, setShowIconScrollToTop] = useState(false);
  const [createPostStatus, setCreatePostStatus] = useState(false);
  const [editPostStatus, setEditPostStatus] = useState(false);
  const [deletePostStatus, setDeletePostStatus] = useState(false);
  const [createSharePostStatus, setCreateSharePostStatus] = useState(false);
  const [editSharePostStatus, setEditSharePostStatus] = useState(false);
  const [deleteSharePostStatus, setDeleteSharePostStatus] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedSharePost, setLikedSharePost] = useState(false);
  const [followAndUnFollow, setFollowAndUnFollow] = useState(false);
  const [showProfilePageStatus, setShowProfilePageStatus] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [sortAllPostAscening, setSortAllPostAscending] = useState([]);
  const [dataUserNotification, setDataUserNotification] = useState([]);
  const [openProfileStatus, setOpenProfileStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [postOfusers, setPostOfusers] = useState([]);
  const [postOfUsersToShare, setPostOfUsersToShare] = useState([]);
  const [userDataInActive, setUserDataInActive] = useState({});
  const [alertStatus, setAlertStatus] = useState(false);
  const [countAlert, setCountAlert] = useState(0);

  useEffect(() => {
    setUserDataInActive(userInfo?.find((e) => e?._id === userData?.userId));
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
        const sortedUsers = res.sort((a , b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUserInfo(sortedUsers);
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
      const sortedUsers = res.sort((a , b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserInfo(sortedUsers);
    });
  }, [followAndUnFollow]);

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
    socket.current?.on('notificationServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfusers(res);
      });
    });
  }, []);

  useEffect(() => {
    socket.current?.on('postTransactionServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllPosts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfusers(res);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllPosts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      setPostOfusers(res);
    });
  }, []);

  useEffect(() => {
    socket.current?.on('notificationServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllSharePost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfUsersToShare(res);
      });
    });
  }, []);

  useEffect(() => {
    socket.current?.on('postTransactionServerEmit', () => {
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllSharePost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((res) => {
        setPostOfUsersToShare(res);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/getAllSharePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((res) => {
      setPostOfUsersToShare(res);
    });
  }, []);

  useEffect(() => {
    const sortedPosts = [...postOfusers, ...postOfUsersToShare].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortAllPostAscending(sortedPosts);
  }, [postOfusers, postOfUsersToShare]);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeletonPeopleYouMayKnow(false);
      setShowSkeletonCreatePost(false);
      setShowSkeletonNotification(false);
      setShowSkeletonSearchResult(false);
      setShowSkeletonChatsPopup(false);
      setShowSkeletonPost(false);
      setShowSkeletonStatusUsers(false);
      setShowSkeletonProfileUser(false);
      setShowSkeletonUserProfileInHamburger(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    containerPostScroll.addEventListener('scroll', () => {
      if (containerPostScroll.scrollTop > 399) {
        setShowIconScrollToTop(true);
      } else {
        setShowIconScrollToTop(false);
      }
    });
  }, []);

  useEffect(() => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    containerPostScroll.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [createPostStatus, createSharePostStatus]);

  useEffect(() => {
    setUserInfo((prev) => prev.map((e) => {
      if (e.firstname) {
        e.fullname = `${e.firstname} ${e.lastname}`;
      }
      return e;
    }));
  }, [userDataInActive]);

  const scrollToTop = () => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    containerPostScroll.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  const dropdownPopup = () => {
    setOpenMenus(!openMenus);
    setOpenNotifications(false);
    setOpenSearchResult(false);
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

  const SearchResultPopup = () => {
    setOpenSearchResult(!openSearchResult);
    setOpenMenus(false);
    setOpenNotifications(false);
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

  const closeDropdown = () => {
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    setOpenChats(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.remove('close-popup');
  }

  const signOut = () => {
    localStorage.removeItem('token');
    setLogoutStatus(true);
    navigate('/');
  }

  return (
    <div className='container-media-page'>
      <div id='close-popup' onClick={closeDropdown}></div>
      <header className='container-header'>
        <div className='content-left-header'>
          <Link onClick={scrollToTop} to='/media' className='text-decoration-none'><h2 className='logo-header'>BYNSocial</h2></Link>
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
          <Link to='/chat' className='container-icons' onClick={chatsPopup}>
            <div className='bg-hover-msg'>
              <FontAwesomeIcon className='icons-in-content-right-header' icon={faComment} />
            </div>
          </Link>
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
            <Link to='/chat' className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-content-right-header' icon={faComment} />Chats</p>
            </Link>
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
      <div className='container-body-in-media-page'>
        <div className='content-left-in-body'>
          <div className='fix-container-content-left-in-body'>
            <div className='container-left-in-body'>
              <p className='header-text-people-you-may-know'>People you may know</p>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
              <div className='overflow-auto-caontainer-fix'>
                {showSkeletonPeopleYouMayKnow
                  ?
                  userInfo.filter((e) => {
                    return e._id !== userData.userId;
                  }).map((e) => (
                    <SkeletonPeopleYouMayKnow key={e?._id} />
                  ))
                  :
                  userInfo.filter((e) => {
                    return e._id !== userData.userId;
                  }).map((e) => (
                    <PeopleYouMayKnow key={e?._id} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} activeUserId={userData.userId} activeUserData={userDataInActive} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} follower={e.follower} />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className='content-center-in-body'>
          {showSkeletonCreatePost
            ?
            <SkeletonCreatePost />
            :
            <CreatePost activeUserId={userData.userId} userInfo={userInfo} createPostStatus={createPostStatus} setCreatePostStatus={setCreatePostStatus} />
          }
          <div id='container-post-scroll' className='overflow-y-auto-in-post-content-of-users'>
            {showIconScrollToTop &&
              <div onClick={scrollToTop} className='container-button-scroll-to-top-in-overflow-y-auto-in-post-content-of-users'>
                <FontAwesomeIcon icon={faArrowUp} className='arrow-up-icon-in-container-button-scroll-to-top-in-overflow-y-auto-in-post-content-of-users' />
              </div>
            }
            {showSkeletionPost
              ?
              sortAllPostAscening.map((e) => (
                <SkeletonPost key={e?._id} />
              ))
              :
              userDataInActive !== null && userDataInActive !== undefined && Object.keys(userDataInActive).length !== 0 &&
              sortAllPostAscening.map((e) => {
                if (e.userIdToPost && e.isBlock === false) {
                  return <Post key={e?._id} setSortAllPostAscending={setSortAllPostAscending} setOpenProfileStatus={setOpenProfileStatus} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} setCreateSharePostStatus={setCreateSharePostStatus} createSharePostStatus={createSharePostStatus} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive?._id} likedPost={likedPost} setLikedPost={setLikedPost} editPostStatus={editPostStatus} setEditPostStatus={setEditPostStatus} deletePostStatus={deletePostStatus} setDeletePostStatus={setDeletePostStatus} userInfo={userInfo} activeUserId={userData.userId} postId={e._id} userIdToPost={e.userIdToPost} postMsg={e.postMsg} postImgs={e.postImgs} postVideo={e.postVideo} createdAt={e.createdAt} postLikes={e.postLikes} />;
                } else {
                  return e.isBlock === false && <SharePost key={e?._id} setOpenProfileStatus={setOpenProfileStatus} showProfilePageStatus={showProfilePageStatus} setShowProfilePageStatus={setShowProfilePageStatus} setCreateSharePostStatus={setCreateSharePostStatus} createSharePostStatus={createSharePostStatus} userDataInActive={userDataInActive?._id} setFollowAndUnFollow={setFollowAndUnFollow} followAndUnFollow={followAndUnFollow} setLikedSharePost={setLikedSharePost} likedSharePost={likedSharePost} setDeleteSharePostStatus={setDeleteSharePostStatus} deleteSharePostStatus={deleteSharePostStatus} setEditSharePostStatus={setEditSharePostStatus} editSharePostStatus={editSharePostStatus} shareId={e._id} userIdToShare={e.userIdToShare} postIdToShare={e.postIdToShare} shareMsg={e.shareMsg} sharePostLikes={e.sharePostLikes} createdAt={e.createdAt} userInfo={userInfo} activeUserId={userData.userId} postOfusers={postOfusers} />;
                }
              })
            }
            {/* {sortAllPostAscening.length === 0 && <p style={{ textAlign: "center"}} className='no-notification'>Post is empty.</p>} */}
          </div>
        </div>
        <div className='content-right-in-body'>
          <div className='container-content-right-in-body'>
            {showSkeletonProfileUser
              ?
              <SkeletonUserProfileInMedia />
              :
              userDataInActive !== undefined
                ?
                <Link to={`/profile/${userDataInActive._id}`} className='container-user-profile-in-container-content-right-in-body'>
                  <div className='container-img-container-user-profile-in-container-content-right-in-body'>
                    <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='profileImg' />
                  </div>
                  <div className='container-fullname-active-user-in-container-user-profile-in-container-content-right-in-body'>
                    <b>{userDataInActive.firstname} {userDataInActive.lastname}</b>
                  </div>
                </Link>
                :
                <></>
            }
          </div>
          <div className='container-user-online-list-in-content-right-in-body'>
            <p className='status-user-text-in-container-user-online-list-in-content-right-in-body'>Followed users status</p>
            <div className='border-bottom-of-status-user-text-in-container-user-online-list-in-content-right-in-body'></div>
            <div className='container-body-in-container-user-online-list-in-content-right-in-body'>
              {showSkeletonStatusUser
                ?
                userInfo.filter((e) => {
                  return e._id !== userData.userId
                }).map((e) => {
                  return e.follower.includes(userDataInActive?._id) && <SkeletonStatusUsers key={e?._id} />
                })
                :
                userDataInActive?.following.length === 0
                  ?
                  <p style={{ marginBottom: '0', textAlign: 'center', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '500', color: '#353535' }}>No one followed</p>
                  :
                  userInfo.filter((e) => {
                    return e._id !== userData.userId
                  }).map((e) => {
                    if (e.active && e.follower.includes(userDataInActive?._id)) {
                      return <StatusUsers key={e?._id} active={e.active} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />;
                    }
                    if (e.follower.includes(userDataInActive?._id)) {
                      return <StatusUsers key={e?._id} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />;
                    }
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Media;