import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft , faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PendingSuccess = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div>
          <div className='logo-container'>
            <FontAwesomeIcon icon={faCircleCheck} className='check-logo'/>  
          </div>
          <h1>Successfully!</h1>
          <p>Your password has been successfully reset.</p>
          <p>Click below to sign in page.</p>
          <form>
            <Link to='/' className='button'>Continue</Link>
            <div className='buttom-content'>
              <Link to='/' className='signup'><FontAwesomeIcon icon={faArrowLeft}/>&nbsp;&nbsp;Back to sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight/>
    </div>
  )
}

export default PendingSuccess;