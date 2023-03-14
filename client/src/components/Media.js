import React, { useEffect } from 'react';
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

const Media = () => {
  const navigate = useNavigate();

  const [openHiddenMenuInHeader, setOpenHiddenMenuInHeader] = useState(false);
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
  const [openFollowerPopup, setOpenFollowerPopup] = useState(false);
  const [openFollowingPopup, setOpenFollowingPopup] = useState(false);
  const [createPostStatus, setCreatePostStatus] = useState(false);
  const [editPostStatus, setEditPostStatus] = useState(false);
  const [deletePostStatus, setDeletePostStatus] = useState(false);
  const [createSharePostStatus, setCreateSharePostStatus] = useState(false);
  const [editSharePostStatus, setEditSharePostStatus] = useState(false);
  const [deleteSharePostStatus, setDeleteSharePostStatus] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [likedSharePost , setLikedSharePost] = useState(false);
  const [followAndUnFollow, setFollowAndUnFollow] = useState(false);
  const [searchResult, setSearchResult] = useState('');
  const [sortAllPostAscening, setSortAllPostAscending] = useState([]);
  const [dataUserNotification, setDataUserNotification] = useState(
    [
      {
        image: `user1.png`,
        username: 'Bell bunlung',
        userContent: 'Create a new post now.',
        modifyDate: '4 week ago.'
      },
      {
        image: `user2.png`,
        username: 'Prayut Chan O Cha',
        userContent: 'Create a new post now.',
        modifyDate: '1 minute ago.'
      },
      {
        image: `user3.png`,
        username: 'บัลลังก์ มาเอี่ยม',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user4.png`,
        username: 'มากมี ศรีสุข',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user5.png`,
        username: 'ดวงใจ มากมาย',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user6.png`,
        username: 'สมพร ดวงดี',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user7.png`,
        username: 'สมหมาย ใจงาม',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user8.png`,
        username: 'สมหมาย ใจงาม',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user9.png`,
        username: 'สมหมาย ใจงาม',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
      {
        image: `user10.png`,
        username: 'สมหมาย ใจงาม',
        userContent: 'like your post.',
        modifyDate: '10 minutes ago.'
      },
    ]
  );
  const [dataUserChats, setDataUserChats] = useState(
    [
      {
        image: `user1.png`,
        fullname: 'Bell bunlung',
        senderChat: 'Hello...'
      },
      {
        image: `user2.png`,
        fullname: 'Prayut Chan O Cha',
        senderChat: 'Hello...'
      },
      {
        image: `user3.png`,
        fullname: 'บัลลังก์ มาเอี่ยม',
        senderChat: 'Hello...'
      },
      {
        image: `user4.png`,
        fullname: 'มากมี ศรีสุข',
        senderChat: 'Hello...'
      },
      {
        image: `user5.png`,
        fullname: 'ดวงใจ มากมาย',
        senderChat: 'Hello...'
      },
      {
        image: `user6.png`,
        fullname: 'สมพร ดวงดี',
        senderChat: 'Hello...'
      },
      {
        image: `user7.png`,
        fullname: 'สมหมาย ใจงาม',
        senderChat: 'Hello...'
      },
    ]
  );
  const [userInfo, setUserInfo] = useState([]);
  const [postOfusers, setPostOfusers] = useState([]);
  const [postOfUsersToShare, setPostOfUsersToShare] = useState([]);
  const [userDataInActive, setUserDataInActive] = useState({});

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
      setPostOfusers([...res]);
    });
  }, [createPostStatus, editPostStatus, deletePostStatus, likedPost, followAndUnFollow]);

  useEffect(() => {
    setUserDataInActive(userInfo.find((e) => e._id === userData.userId));
  });
 
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
  }, [createSharePostStatus, editSharePostStatus, deleteSharePostStatus , likedSharePost]);

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
        userData
      }
    });
  }

  const openPageNotificationsInHamburger = () => {
    navigate('/notifications', {
      state: {
        dataUserNotification
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
    setOpenChats(!openChats);
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
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
    navigate('/');
  }

  return (
    <div className='container-media-page'>
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
                    return searchResult !== '' ? e.firstname.toLowerCase().includes(searchResult.toLowerCase()) && e.firstname.toLowerCase() !== userData.firstname && e.lastname.toLowerCase() !== userData.lastname || e.lastname.toLowerCase().includes(searchResult.toLowerCase()) && e.firstname.toLowerCase() !== userData.firstname && e.lastname.toLowerCase() !== userData.lastname : '';
                  }).map((e, index) => (
                    <SkeletonSearchResult key={index} />
                  ))
                  :
                  userInfo.filter((e) => {
                    return searchResult !== '' ? e.firstname.toLowerCase().includes(searchResult.toLowerCase()) && e.firstname.toLowerCase() !== userData.firstname && e.lastname.toLowerCase() !== userData.lastname || e.lastname.toLowerCase().includes(searchResult.toLowerCase()) && e.firstname.toLowerCase() !== userData.firstname && e.lastname.toLowerCase() !== userData.lastname : '';
                  }).map((e, index) => (
                    <SearchResult key={index} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />
                  ))
                }
                {searchResult === '' && <div className='no-search-result-container'><p className='no-search-result'>Users not found.</p></div>}
              </div>
            }
          </div>
        </div>
        <div className='content-right-header'>
          <div className='container-icons' id='notification-id'>
            <div className='bell-onclick' onClick={notificationPopup}>
              <div className='alert-red-circle'></div>
              <FontAwesomeIcon className='icons-in-content-right-header' icon={faBell} />
            </div>
            {openNotifications &&
              <div className='notification-popup'>
                <div className='notification-header'>
                  <p className='p-notification-header'>Notifications</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='notification-body' style={dataUserNotification.length === 1 ? { height: '100px' } : dataUserNotification.length === 2 ? { height: '200px' } : dataUserNotification.length === 3 ? { height: '300px' } : dataUserNotification.length === 4 ? { height: '400px' } : dataUserNotification.length > 4 ? { height: '400px' } : { height: 'auto' }}>
                  {showSkeletonNotification
                    ?
                    dataUserNotification.map((e, index) => (
                      <SkeletonNotification key={index} />
                    ))
                    :
                    dataUserNotification.map((e, index) => (
                      <Notification key={index} image={e.image} username={e.username} userContent={e.userContent} modifyDate={e.modifyDate} />
                    ))
                  }
                  {dataUserNotification.length === 0 && <p className='no-notification'>No notification at this time.</p>}
                </div>
              </div>
            }
          </div>
          <div className='container-icons' onClick={chatsPopup}>
            <div className='bg-hover-msg'>
              <div className='alert-red-circle'></div>
              <FontAwesomeIcon className='icons-in-content-right-header' icon={faComment} />
            </div>
            {openChats &&
              <div className='container-chats-popup'>
                <div className='content-header-in-chat-popup'>
                  <p>Chats</p>
                </div>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
                <div className='content-center-in-chat-popup' style={dataUserChats.length === 1 ? { height: '90px' } : dataUserChats.length === 2 ? { height: '180px' } : dataUserChats.length === 3 ? { height: '270px' } : dataUserChats.length === 4 ? { height: '360px' } : dataUserChats.length > 4 ? { height: '400px' } : { height: 'auto' }}>
                  {showSkeletonChatsPopup
                    ?
                    dataUserChats.map((e, index) => (
                      <SkeletonChatsPopup key={index} />
                    ))
                    :
                    dataUserChats.map((e, index) => (
                      <ChatPopup key={index} image={e.image} fullname={e.fullname} senderChat={e.senderChat} />
                    ))
                  }
                  {dataUserChats.length === 0 && <p className='no-notification'>No chats from user.</p>}
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
                <div className='menus-in-dropdown'>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen} />&nbsp;&nbsp;<span className='text-in-dropdown'>Profile</span>
                </div>
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
            <Link to='/chats' className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-content-right-header' icon={faComment} />Chats</p>
            </Link>
            <Link to='/profile' className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen} />Profile</p>
            </Link>
            <div onClick={signOut} className='container-menus-in-hidden-content-in-header-popup'>
              <p><FontAwesomeIcon className='icons-in-dropdown' icon={faArrowRightFromBracket} />Signout</p>
            </div>
            <div style={{ width: '95%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
          </div>
        </div>
      </header>
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
                  }).map((e, index) => (
                    <SkeletonPeopleYouMayKnow key={index} />
                  ))
                  :
                  userInfo.filter((e) => {
                    return e._id !== userData.userId;
                  }).map((e, index) => (
                    <PeopleYouMayKnow key={index} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} activeUserData={userDataInActive} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} follower={e.follower} />
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
              sortAllPostAscening.map((e, index) => (
                <SkeletonPost key={index} />
              ))
              :
              sortAllPostAscening.map((e, index) => {
                if (e.userIdToPost) {
                  return <Post key={index} setCreateSharePostStatus={setCreateSharePostStatus} createSharePostStatus={createSharePostStatus} followAndUnFollow={followAndUnFollow} setFollowAndUnFollow={setFollowAndUnFollow} userDataInActive={userDataInActive} likedPost={likedPost} setLikedPost={setLikedPost} editPostStatus={editPostStatus} setEditPostStatus={setEditPostStatus} deletePostStatus={deletePostStatus} setDeletePostStatus={setDeletePostStatus} userInfo={userInfo} activeUserId={userData.userId} postId={e._id} userIdToPost={e.userIdToPost} postMsg={e.postMsg} postImgs={e.postImgs} postVideo={e.postVideo} createdAt={e.createdAt} postLikes={e.postLikes} />;
                } else {
                  return <SharePost key={index} setCreateSharePostStatus={setCreateSharePostStatus} createSharePostStatus={createSharePostStatus} userDataInActive={userDataInActive} setFollowAndUnFollow={setFollowAndUnFollow} followAndUnFollow={followAndUnFollow} setLikedSharePost={setLikedSharePost} likedSharePost={likedSharePost} setDeleteSharePostStatus={setDeleteSharePostStatus} deleteSharePostStatus={deleteSharePostStatus} setEditSharePostStatus={setEditSharePostStatus} editSharePostStatus={editSharePostStatus} shareId={e._id} userIdToShare={e.userIdToShare} postIdToShare={e.postIdToShare} shareMsg={e.shareMsg} sharePostLikes={e.sharePostLikes} createdAt={e.createdAt} userInfo={userInfo} activeUserId={userData.userId} postOfusers={postOfusers} />;
                }
              })
            }
          </div>
        </div>
        <div className='content-right-in-body'>
          <div className='container-content-right-in-body'>
            {showSkeletonProfileUser ?
              <SkeletonUserProfileInMedia />
              :
              <Link to={`/profile/${userDataInActive._id}`} className='container-user-profile-in-container-content-right-in-body'>
                {userDataInActive === undefined
                  ?
                  <></>
                  :
                  <>
                    <div className='container-img-container-user-profile-in-container-content-right-in-body'>
                      <img src={`${process.env.REACT_APP_SERVER_DOMAIN}/userProfileImg/${!userDataInActive.profilePicture ? 'profileImgDefault.jpg' : userDataInActive.profilePicture}`} alt='profileImg' />
                    </div>
                    <div className='container-fullname-active-user-in-container-user-profile-in-container-content-right-in-body'>
                      <b>{userDataInActive.firstname} {userDataInActive.lastname}</b>
                    </div>
                  </>
                }
              </Link>
            }
          </div>
          <div className='container-user-online-list-in-content-right-in-body'>
            <p className='status-user-text-in-container-user-online-list-in-content-right-in-body'>Users status</p>
            <div className='border-bottom-of-status-user-text-in-container-user-online-list-in-content-right-in-body'></div>
            <div className='container-body-in-container-user-online-list-in-content-right-in-body'>
              {showSkeletonStatusUser
                ?
                userInfo.filter((e) => {
                  return e._id !== userData.userId
                }).map((e, index) => (
                  <SkeletonStatusUsers key={index} />
                ))
                :
                userInfo.filter((e) => {
                  return e._id !== userData.userId
                }).map((e, index) => (
                  <StatusUsers key={index} userId={e._id} image={e.profilePicture} firstname={e.firstname} lastname={e.lastname} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media;