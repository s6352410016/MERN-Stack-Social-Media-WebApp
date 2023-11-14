import React from 'react';
import loginLogo from './images/loginLogo.svg';
import './css/ContentRight.css';

const ContentRight = () => {
  return (
    <div className='content-right'>
        <img src={loginLogo} alt='loginLogo'/>
    </div>
  );
}

export default ContentRight;