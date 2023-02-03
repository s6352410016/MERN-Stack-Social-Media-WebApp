import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass , faBell , faComment , faGear , faAddressCard , faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './css/MediaPage.css';

const Media = () => {

  const navigate = useNavigate();

  const [userData , setUserData] = useState('');

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

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const optionsPopup = () => {
    const optionsPopup = document.querySelector('.dropdown-menu-settings');
    optionsPopup.classList.toggle('options-popup');
  }

  // const removePopup = () => {
  //   const optionsPopup = document.querySelector('.dropdown-menu-settings');
  //   optionsPopup.classList.remove('options-popup');
  // }

  return (
    <div className='container-media-page'>
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
          <ul className='options-in-media-page'>
            <li className='container-options'>
              <div className='alert-options'></div>
              <FontAwesomeIcon className='option-font-style bell' icon={faBell}/>              
            </li>
            <li className='container-options'>
              <div className='alert-options'></div>
              <FontAwesomeIcon className='option-font-style message' icon={faComment}/>              
            </li>
            <li className='container-options position-relative'  onClick={optionsPopup}>
              <div className='alert-options'></div>
              <FontAwesomeIcon className='option-font-style gear' icon={faGear}/>
              <ul className='dropdown-menu-settings'>
                <li className='dropdown-menu-lists'>
                  <FontAwesomeIcon icon={faAddressCard}/>&nbsp;&nbsp;&nbsp;Profile
                </li>
                <li className='dropdown-menu-lists' onClick={signOut}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket}/>&nbsp;&nbsp;&nbsp;SignOut
                </li>
              </ul>              
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Media;