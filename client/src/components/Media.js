import React, { useEffect } from 'react';
import { useState , useRef } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass , faBell , faComment , faChevronDown , faUserPen , faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './css/MediaPage.css';
import Notification from './Notification';
import SearchResult from './SearchResult';

const Media = () => {

  const navigate = useNavigate();

  const [userData , setUserData] = useState('');
  const [openMenus , setOpenMenus] = useState(false);
  const [openNotifications , setOpenNotifications] = useState(false);
  const [openSearchResult , setOpenSearchResult] = useState(false);
  const [searchResult , setSearchResult] = useState('');
  
  const dataUserNotification = [
    {
      image: require('../images/notificationImages/user1.png'),
      username: 'Bell bunlung',
      userContent: 'Create a new post now.',
      modifyDate: '4 week ago.'
    },
    {
      image: require('../images/notificationImages/user2.png'),
      username: 'Prayut Chan O Cha',
      userContent: 'Create a new post now.',
      modifyDate: '1 minute ago.'
    },
    {
      image: require('../images/notificationImages/user3.png'),
      username: 'บัลลังก์ มาเอี่ยม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/notificationImages/user3.png'),
      username: 'บัลลังก์ มาเอี่ยม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/notificationImages/user3.png'),
      username: 'บัลลังก์ มาเอี่ยม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/notificationImages/user3.png'),
      username: 'บัลลังก์ มาเอี่ยม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
    {
      image: require('../images/notificationImages/user3.png'),
      username: 'บัลลังก์ มาเอี่ยม',
      userContent: 'like your post.',
      modifyDate: '10 minutes ago.'
    },
  ];

  const dataUserSearchResult = [
    {
      image: require('../images/notificationImages/user1.png'),
      fullname: 'Bell bunlung'
    },
    {
      image: require('../images/notificationImages/user2.png'),
      fullname: 'Prayut Chan O Cha'
    },
    {
      image: require('../images/notificationImages/user3.png'),
      fullname: 'บัลลังก์ มาเอี่ยม'
    }
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

  const dropdownPopup = () => {
    setOpenMenus(!openMenus);
    setOpenNotifications(false);
    setOpenSearchResult(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const notificationPopup = () => {
    setOpenNotifications(!openNotifications);
    setOpenMenus(false);
    setOpenSearchResult(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const SearchResultPopup = () => {
    setOpenSearchResult(!openSearchResult);
    setOpenMenus(false);
    setOpenNotifications(false);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const closeDropdown = () => {
    setOpenMenus(false);
    setOpenNotifications(false);
    setOpenSearchResult(false);
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
          <Link to='/media' className='text-decoration-none'><h2 className='logo-header'>BYN</h2></Link>
        </div>
        <div className='content-center-header'>
          <div className='container-input-header' onClick={SearchResultPopup}>
            <FontAwesomeIcon className='icon-search-input' icon={faMagnifyingGlass}/>&nbsp;&nbsp;
            <input className='search-people' type='text' placeholder='Search people' onChange={(e) => setSearchResult(e.target.value)}/>
            {openSearchResult && 
              <div className='search-result'>
                {dataUserSearchResult.filter((e) => {
                  return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());          
                }).map((e , index) => (
                  <SearchResult key={index} image={e.image} fullname={e.fullname}/>
                ))}
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
                  <p className='p-notification-header'>Notification</p>
                </div>
                <hr style={{width: '100%' , height: '2px' , color: '#353535' , margin: '0'}}/>
                <div className='notification-body' style={dataUserNotification.length === 1 ? {height: '100px'} : dataUserNotification.length === 2 ? {height: '200px'} : dataUserNotification.length === 3 ? {height: '300px'} : dataUserNotification.length === 4 ? {height: '400px'} : dataUserNotification.length > 4 ? {height: '400px'} : {height: 'auto'}}>
                  {dataUserNotification.map((e , index) => (
                    <Notification key={index} image={e.image} username={e.username} userContent={e.userContent} modifyDate={e.modifyDate}/>
                  ))}
                  {dataUserNotification.length === 0 && <p className='no-notification'>No notification at this time.</p>}
                </div>
              </div>
            }
          </div>
          <div className='container-icons'>
            <div className='alert-red-circle'></div>
            <FontAwesomeIcon className='icons-in-content-right-header' icon={faComment}/>
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
          <div className='container-profile-user-in-body'>
            <div className='image-background-user'>
              <img src='https://cdn.pixabay.com/photo/2022/06/20/17/17/mountain-7274247_640.jpg' alt='backgroundImageUser'/>
            </div>
            <div className='image-profile-user-in-body'>
              <img src='https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg' alt='imageProfileUser'/>
            </div>
            <div className='fullname-and-info-user-in-body'>
              <b>{userData.firstname} {userData.lastname}</b>
              <p>Backend Developer</p>
              <span className='border-bottom-in-fullname-and-info-user-in-body'></span>
            </div>
            <div className='status-user-in-body'>
              <div className='followings'>
                <b>125</b>
                <p>Followings</p>
              </div>
              <div className='followers'>
                <b>7,125</b>
                <p>Followers</p>
              </div>
              <div className='posts'>
                <b>5</b>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>
        <div className='content-center-in-body'>
          <div className='container-center-in-body'>
            <h2>Center</h2>
          </div>
        </div>
        <div className='content-right-in-body'>
          <h2>Right</h2>
        </div>
      </div>
    </div>
  );
}

export default Media;