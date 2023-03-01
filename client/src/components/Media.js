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

const Media = () => {
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
  const [showSkeletionPost, setShowSkeletonPost] = useState(true);
  const [showIconScrollToTop, setShowIconScrollToTop] = useState(false);
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
  const [dataForUser, setDataForUser] = useState(
    [
      {
        image: `user1.png`,
        fullname: 'bunlung maieam',
        userId: '63db82a0028c87f7d37c6628'
      },
      {
        image: `user2.png`,
        fullname: 'Prayut Chan O Cha',
        userId: '02'
      },
      {
        image: `user3.png`,
        fullname: 'บัลลังก์ มาเอี่ยม',
        userId: '03'
      },
      {
        image: `user4.png`,
        fullname: 'มากมี ศรีสุข',
        userId: '04'
      },
      {
        image: `user5.png`,
        fullname: 'ดวงใจ มากมาย',
        userId: '05'
      },
      {
        image: `user6.png`,
        fullname: 'สมพร ดวงดี',
        userId: '06'
      },
      {
        image: `user7.png`,
        fullname: 'สมหมาย ใจงาม',
        userId: '07'
      },
      {
        image: `user8.png`,
        fullname: 'สมคิด จิตสงบ',
        userId: '08'
      },
      {
        image: `user9.png`,
        fullname: 'บุญมี มากล้น',
        userId: '09'
      },
      {
        image: `user10.png`,
        fullname: 'บุญงาม พอแล้ว',
        userId: '10'
      },
      {
        image: `user11.png`,
        fullname: 'สมควร รวยมาก',
        userId: '11'
      },
      {
        image: `user12.png`,
        fullname: 'สมจิตร จงจอหอ',
        userId: '12'
      },
      {
        image: `user13.png`,
        fullname: 'พอดี พอแล้ว',
        userId: '13'
      },
      {
        image: `user14.png`,
        fullname: 'Mark Sukkerberg',
        userId: '14'
      },
      {
        image: `user15.png`,
        fullname: 'Elon Mask',
        userId: '15'
      },
    ]
  );
  const [postOfusers, setPostOfusers] = useState(
    [
      {
        postId: '01',
        userIdToPost: '63db82a0028c87f7d37c6628',
        postMsg: 'This is a new post...',
        postImgs: [
          'img1.webp',
          'img2.jpg',
        ],
        postVideo: '',
        createdAt: '2023-02-02T09:30:09.048+00:00',
        postLikes: ['63db82a0028c87f7d37c6628', '02', '03']
      },
      {
        postId: '02',
        userIdToPost: '02',
        postMsg: 'Holy Shit!!!',
        postImgs: [
          'img3.jpg',
          'img4.jpg',
          'img5.webp',
        ],
        postVideo: '',
        createdAt: '2023-02-02T09:43:05.427+00:00',
        postLikes: ['63db82a0028c87f7d37c6628', '10', '05', '09', '06']
      },
      {
        postId: '03',
        userIdToPost: '03',
        postMsg: 'What The Fuck...',
        postImgs: [
          'img6.webp',
          'img7.jpg',
          'img8.jpg',
          'img9.webp',
        ],
        postVideo: '',
        createdAt: '2023-02-02T09:43:36.020+00:00',
        postLikes: []
      },
      {
        postId: '04',
        userIdToPost: '04',
        postMsg: 'โครตดึง',
        postImgs: [

        ],
        postVideo: 'video1.mp4',
        createdAt: '2023-02-02T09:45:36.031+00:00',
        postLikes: []
      },
      {
        postId: '05',
        userIdToPost: '05',
        postMsg: 'วัยรุ่นคำมี',
        postImgs: [
          'img10.webp',
        ],
        postVideo: '',
        createdAt: '2023-02-19T14:27:00.554+00:00',
        postLikes: []
      },
      {
        postId: '06',
        userIdToPost: '06',
        postMsg: 'ซีมอกเหล่าตั๊ก',
        postImgs: [

        ],
        postVideo: 'video2.mp4',
        createdAt: '2023-02-23T09:06:20.966+00:00',
        postLikes: ['63db82a0028c87f7d37c6628']
      },
      {
        postId: '07',
        userIdToPost: '07',
        postMsg: 'Test+++',
        postImgs: [
          'img2.jpg',
        ],
        postVideo: '',
        createdAt: '2023-02-23T09:06:20.966+00:00',
        postLikes: []
      },
      {
        postId: '08',
        userIdToPost: '63db82a0028c87f7d37c6628',
        postMsg: 'The Fuck.',
        postImgs: [

        ],
        postVideo: '',
        createdAt: '2023-02-19T14:27:00.554+00:00',
        postLikes: []
      },
      {
        postId: '09',
        userIdToPost: '10',
        postMsg: 'Hello world...',
        postImgs: [

        ],
        postVideo: '',
        createdAt: '2023-02-19T14:27:00.554+00:00',
        postLikes: []
      },
      {
        postId: '10',
        userIdToPost: '63db82a0028c87f7d37c6628',
        postMsg: 'Hello React...',
        postImgs: [

        ],
        postVideo: '',
        createdAt: '2023-02-19T14:27:00.554+00:00',
        postLikes: []
      },
      {
        postId: '11',
        userIdToPost: '06',
        postMsg: '5555+',
        postImgs: [
          'img10.webp'
        ],
        postVideo: '',
        createdAt: '2023-02-19T14:27:00.554+00:00',
        postLikes: []
      },
    ]
  );
  const [postOfUsersToShare, setPostOfUsersToShare] = useState(
    [
      {
        shareId: 'share01',
        userIdToShare: '63db82a0028c87f7d37c6628',
        postIdToShare: '02',
        shareMsg: 'Test Share...',
        sharePostLikes: ['63db82a0028c87f7d37c6628'],
        createdAt: '2023-02-19T14:27:00.554+00:00'
      },
      {
        shareId: 'share02',
        userIdToShare: '02',
        postIdToShare: '03',
        shareMsg: '',
        sharePostLikes: [],
        createdAt: '2023-02-19T14:27:00.554+00:00'
      },
      {
        shareId: 'share03',
        userIdToShare: '63db82a0028c87f7d37c6628',
        postIdToShare: '06',
        shareMsg: '...',
        sharePostLikes: ['02', '03'],
        createdAt: '2023-02-19T14:27:00.554+00:00'
      },
      {
        shareId: 'share04',
        userIdToShare: '09',
        postIdToShare: '04',
        shareMsg: '555+',
        sharePostLikes: [],
        createdAt: '2023-02-02T09:43:36.020+00:00'
      },
    ]
  );

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/authUser`, {
      method: 'GET',
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
    const sortedPosts = [...postOfusers, ...postOfUsersToShare].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setSortAllPostAscending(sortedPosts);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeletonPeopleYouMayKnow(false);
      setShowSkeletonCreatePost(false);
      setShowSkeletonNotification(false);
      setShowSkeletonSearchResult(false);
      setShowSkeletonChatsPopup(false);
      setShowSkeletonPost(false);
    }, 2000);
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

  const scrollToTop = () => {
    const containerPostScroll = document.querySelector('#container-post-scroll');
    containerPostScroll.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
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
                  dataForUser.filter((e) => {
                    return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());
                  }).map((e, index) => (
                    <SkeletonSearchResult key={index} />
                  ))
                  :
                  dataForUser.filter((e) => {
                    return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());
                  }).map((e, index) => (
                    <SearchResult key={index} image={e.image} fullname={e.fullname} />
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
                <hr style={{ width: '100%', height: '2px', color: '#353535', margin: '0' }} />
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
                <hr style={{ width: '100%', height: '2px', color: '#353535', margin: '0' }} />
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
      </header>
      <div className='container-body-in-media-page'>
        <div className='content-left-in-body'>
          <div className='fix-container-content-left-in-body'>
            <div className='container-left-in-body'>
              <p className='header-text-people-you-may-know'>People you may know</p>
              <div className='border-top-people-you-may-know'></div>
              <div className='overflow-auto-caontainer-fix'>
                {showSkeletonPeopleYouMayKnow
                  ?
                  dataForUser.map((e, index) => (
                    <SkeletonPeopleYouMayKnow key={index} />
                  ))
                  :
                  dataForUser.map((e, index) => (
                    <PeopleYouMayKnow key={index} image={e.image} fullname={e.fullname} />
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
            <CreatePost />
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
                if (e.postId) {
                  return <Post key={index} dataForUser={dataForUser} activeUserId={userData.userId} postId={e.postId} userIdToPost={e.userIdToPost} postMsg={e.postMsg} postImgs={e.postImgs} postVideo={e.postVideo} createdAt={e.createdAt} postLikes={e.postLikes} />;
                } else {
                  return <SharePost key={index} shareId={e.shareId} userIdToShare={e.userIdToShare} postIdToShare={e.postIdToShare} shareMsg={e.shareMsg} sharePostLikes={e.sharePostLikes} createdAt={e.createdAt} dataForUser={dataForUser} activeUserId={userData.userId} postOfusers={postOfusers} />;
                }
              })
            }
          </div>
        </div>
        <div className='content-right-in-body'>
          <div className='container-content-right-in-body'>
            {userData.userId} {userData.firstname} {userData.lastname}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media;