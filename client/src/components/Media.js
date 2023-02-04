import React, { useEffect } from 'react';
import { useState , useRef } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass , faBell , faComment , faCaretDown , faUserPen , faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './css/MediaPage.css';
import Notification from './Notification';

const Media = () => {

  const navigate = useNavigate();

  const [userData , setUserData] = useState('');
  const [openMenus , setOpenMenus] = useState(false);
  const [openNotifications , setOpenNotifications] = useState(false);

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
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const notificationPopup = () => {
    setOpenNotifications(!openNotifications);
    const closePopup = document.getElementById('close-popup');
    closePopup.classList.add('close-popup');
  }

  const closeDropdown = () => {
    setOpenMenus(false);
    setOpenNotifications(false);
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
          <div className='container-input-header'>
            <FontAwesomeIcon className='icon-search-input' icon={faMagnifyingGlass}/>&nbsp;&nbsp;
            <input className='search-people' type='text' placeholder='Search people'/>
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
                <div className='notification-body'>
                  {dataUserNotification.map((e) => (
                    <Notification image={e.image} username={e.username} userContent={e.userContent} modifyDate={e.modifyDate}/>
                  ))
                  }
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
            <FontAwesomeIcon className='icons-in-content-right-header fix-icon' icon={faCaretDown}/>
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
    </div>
  );
}

export default Media;