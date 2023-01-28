import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const VerifyOTP = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div>
          <h1>Verifying OTP</h1>
          <p>Check your email <span style={{color: '#2E2E2E' , fontWeight: '500'}}>d*****4@hotmail.com</span></p>
          <form>
            <input type='text' className='err-style' placeholder='Enter OTP'/>
            <button>Confirm</button>
            <div className='resend-otp'>
              <span className='first-span'>Don't receive an otp?</span>&nbsp;&nbsp;&nbsp;<span className='last-span'>Click to resend</span>
            </div>
            <div className='buttom-content'>
              <Link to='/' className='signup'><FontAwesomeIcon icon={faArrowLeft}/>&nbsp;&nbsp;Back to sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight/>
    </div>
  );
}

export default VerifyOTP;