import React, { useEffect } from 'react';
import { useState , useRef } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass , faBell , faComment , faChevronDown , faUserPen , faArrowRightFromBracket , faImage , faCirclePlay} from '@fortawesome/free-solid-svg-icons';
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

const Media = () => {

  const navigate = useNavigate();

  const [userData , setUserData] = useState('');
  const [openMenus , setOpenMenus] = useState(false);
  const [openNotifications , setOpenNotifications] = useState(false);
  const [openSearchResult , setOpenSearchResult] = useState(false);
  const [openChats , setOpenChats] = useState(false);
  const [showSkeletonPeopleYouMayKnow , setShowSkeletonPeopleYouMayKnow] = useState(true);
  const [showSkeletonCreatePost , setShowSkeletonCreatePost] = useState(true);
  const [showSkeletonNotification , setShowSkeletonNotification] = useState(true);
  const [showSkeletonSearchResult , setShowSkeletonSearchResult] = useState(true);
  const [showSkeletonChatsPopup , setShowSkeletonChatsPopup] = useState(true);
  const [searchResult , setSearchResult] = useState('');
  
  const dataUserNotification = [
    {
      image: require('../images/allUserProfileImg/user1.png'),
      username: 'Bell bunlung',
      userContent: 'Create a new post now.',
      modifyDate: '4 week ago.'
    },
    {
      image: require('../images/allUserProfileImg/user2.png'),
      username: 'Prayut Chan O Cha',
      userContent: 'Create a new post now.',
      modifyDate: '1 minute ago.'
    },
    {
      image: require('../images/allUserProfileImg/user3.png'),
      username: 'บัลลังก์ มาเอี่ยม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/allUserProfileImg/user4.png'),
      username: 'มากมี ศรีสุข',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/allUserProfileImg/user5.png'),
      username: 'ดวงใจ มากมาย',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/allUserProfileImg/user6.png'),
      username: 'สมพร ดวงดี',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/allUserProfileImg/user7.png'),
      username: 'สมหมาย ใจงาม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
  ];

  const dataUserChats = [
    {
      image: require('../images/allUserProfileImg/user1.png'),
      fullname: 'Bell bunlung',
      senderChat: 'ไงเพื่อนเป็นไงช่วงนี้'
    },
    {
      image: require('../images/allUserProfileImg/user2.png'),
      fullname: 'Prayut Chan O Cha',
      senderChat: 'สวัสดีครับ นายกตู่ !!'
    },
    {
      image: require('../images/allUserProfileImg/user3.png'),
      fullname: 'บัลลังก์ มาเอี่ยม',
      senderChat: 'เย็นนี้กินข้าวไหนอะ'
    },
    {
      image: require('../images/allUserProfileImg/user4.png'),
      fullname: 'มากมี ศรีสุข',
      senderChat: 'เห้ยเพื่อน ศุกร์นี้แดกเหล้าปะ'
    },
    {
      image: require('../images/allUserProfileImg/user5.png'),
      fullname: 'ดวงใจ มากมาย',
      senderChat: 'ไอสัสเอ้ย กูติด F หวะ'
    },
    {
      image: require('../images/allUserProfileImg/user6.png'),
      fullname: 'สมพร ดวงดี',
      senderChat: 'เจอกันเพื่อน...'
    },
    {
      image: require('../images/allUserProfileImg/user7.png'),
      fullname: 'สมหมาย ใจงาม',
      senderChat: 'เกรดเทอมนี้ 4.00 ครับผม'
    },
  ];

  const dataForUser = [
    {
      image: require('../images/allUserProfileImg/user1.png'),
      fullname: 'Bell bunlung'
    },
    {
      image: require('../images/allUserProfileImg/user2.png'),
      fullname: 'Prayut Chan O Cha'
    },
    {
      image: require('../images/allUserProfileImg/user3.png'),
      fullname: 'บัลลังก์ มาเอี่ยม'
    },
    {
      image: require('../images/allUserProfileImg/user4.png'),
      fullname: 'มากมี ศรีสุข'
    },
    {
      image: require('../images/allUserProfileImg/user5.png'),
      fullname: 'ดวงใจ มากมาย'
    },
    {
      image: require('../images/allUserProfileImg/user6.png'),
      fullname: 'สมพร ดวงดี'
    },
    {
      image: require('../images/allUserProfileImg/user7.png'),
      fullname: 'สมหมาย ใจงาม'
    },
    {
      image: require('../images/allUserProfileImg/user8.png'),
      fullname: 'สมคิด จิตสงบ'
    },
    {
      image: require('../images/allUserProfileImg/user9.png'),
      fullname: 'บุญมี มากล้น'
    },
    {
      image: require('../images/allUserProfileImg/user10.png'),
      fullname: 'บุญงาม พอแล้ว'
    },
    {
      image: require('../images/allUserProfileImg/user11.png'),
      fullname: 'สมควร รวยมาก'
    },
    {
      image: require('../images/allUserProfileImg/user12.png'),
      fullname: 'สมจิตร จงจอหอ'
    },
    {
      image: require('../images/allUserProfileImg/user13.png'),
      fullname: 'พอดี พอแล้ว'
    },
    {
      image: require('../images/allUserProfileImg/user14.png'),
      fullname: 'Mark Sukkerberg'
    },
    {
      image: require('../images/allUserProfileImg/user15.png'),
      fullname: 'Elon Mask'
    },
  ];

  useEffect(() => {
    fetch('https://bynsocial.onrender.com/authUser' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if(res.status === 401){
        navigate('/');
      }else if(res.status === 403){
        navigate('/');
      }else{
        return res.json();
      }
    }).then((res) => {
      setUserData({
        firstname: res.firstname,
        lastname: res.lastname
      });
    });
  } , []);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeletonPeopleYouMayKnow(false);
      setShowSkeletonCreatePost(false);
      setShowSkeletonNotification(false);
      setShowSkeletonSearchResult(false);
      setShowSkeletonChatsPopup(false);
    } , 3000);
  } , []);

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
            <FontAwesomeIcon className='icon-search-input' icon={faMagnifyingGlass}/>&nbsp;&nbsp;
            <input className='search-people' type='text' placeholder='Search people' onChange={(e) => setSearchResult(e.target.value)}/>
            {openSearchResult && 
              <div className='search-result'>
                {showSkeletonSearchResult 
                  ?
                  dataForUser.filter((e) => {
                    return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());          
                  }).map((e , index) => (
                    <SkeletonSearchResult/>
                  ))
                  :
                  dataForUser.filter((e) => {
                    return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());          
                  }).map((e , index) => (
                    <SearchResult key={index} image={e.image} fullname={e.fullname}/>
                  ))
                }
                {searchResult === '' && <div className='no-search-result-container'><p className='no-search-result'>Users not found.</p></div>}
              </div>
            }
          </div>
        </div>
        <div className='content-right-header'>
          <div className='container-icons' id='notification-id' onClick={notificationPopup}>
            <div className='alert-red-circle'></div>
            <FontAwesomeIcon className='icons-in-content-right-header' icon={faBell}/>
            {openNotifications &&
              <div className='notification-popup'>
                <div className='notification-header'>
                  <p className='p-notification-header'>Notifications</p>
                </div>
                <hr style={{width: '100%' , height: '2px' , color: '#353535' , margin: '0'}}/>
                <div className='notification-body' style={dataUserNotification.length === 1 ? {height: '100px'} : dataUserNotification.length === 2 ? {height: '200px'} : dataUserNotification.length === 3 ? {height: '300px'} : dataUserNotification.length === 4 ? {height: '400px'} : dataUserNotification.length > 4 ? {height: '400px'} : {height: 'auto'}}>
                  {showSkeletonNotification 
                    ?
                    dataUserNotification.map((e , index) => (
                      <SkeletonNotification key={index}/>
                    ))
                    :
                    dataUserNotification.map((e , index) => (
                      <Notification key={index} image={e.image} username={e.username} userContent={e.userContent} modifyDate={e.modifyDate}/>
                    ))
                  }  
                  {dataUserNotification.length === 0 && <p className='no-notification'>No notification at this time.</p>}
                </div>
              </div>
            }
          </div>
          <div className='container-icons' onClick={chatsPopup}>
            <div className='alert-red-circle'></div>
            <FontAwesomeIcon className='icons-in-content-right-header' icon={faComment}/>
            {openChats &&
              <div className='container-chats-popup'>
                <div className='content-header-in-chat-popup'>
                  <p>Chats</p>
                </div>
                <hr style={{width: '100%' , height: '2px' , color: '#353535' , margin: '0'}}/>
                <div className='content-center-in-chat-popup' style={dataUserChats.length === 1 ? {height: '90px'} : dataUserChats.length === 2 ? {height: '180px'} : dataUserChats.length === 3 ? {height: '270px'} : dataUserChats.length === 4 ? {height: '360px'} : dataUserChats.length > 4 ? {height: '400px'} : {height: 'auto'}}>
                {showSkeletonChatsPopup 
                  ? 
                  dataUserChats.map((e , index) => (
                    <SkeletonChatsPopup key={index}/>
                  ))
                  :
                  dataUserChats.map((e , index) => (
                    <ChatPopup key={index} image={e.image}  fullname={e.fullname} senderChat={e.senderChat}/>
                  ))
                }
                {dataUserChats.length === 0 && <p className='no-notification'>No chats from user.</p>}
                </div>
              </div>
            }
          </div>
          <div className='container-icons' id='dropdown-menus-id' onClick={dropdownPopup}>
            <FontAwesomeIcon className='icons-in-content-right-header fix-icon' icon={faChevronDown}/>
            {openMenus && 
              <div className='dropdown-menus-class'>
                <div className='menus-in-dropdown'>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faUserPen}/>&nbsp;&nbsp;<span className='text-in-dropdown'>Edit profile</span>
                </div>
                <div className='menus-in-dropdown' onClick={signOut}>
                  <FontAwesomeIcon className='icons-in-dropdown' icon={faArrowRightFromBracket}/>&nbsp;&nbsp;<span className='text-in-dropdown'>Signout</span>
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
                  dataForUser.map((e , index) => (
                    <SkeletonPeopleYouMayKnow key={index}/>
                  ))
                  : 
                  dataForUser.map((e , index) => (
                    <PeopleYouMayKnow key={index} image={e.image} fullname={e.fullname}/>
                  ))
                }
                </div>    
            </div>
          </div>
        </div>
        <div className='content-center-in-body'>
          {showSkeletonCreatePost 
            ? 
            <SkeletonCreatePost/>
            :
            <CreatePost/>
          }
        </div>
        <div className='content-right-in-body'>
          <div className='container-content-right-in-body'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media;