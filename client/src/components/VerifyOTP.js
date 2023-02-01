import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEmailContext } from './ForgotPassword';

const VerifyOTP = () => {
  const value = useEmailContext();
  console.log(value);
  const [otp , setOTP] = useState('');
  const [errMsg , setErrMsg] = useState('');

  const verifyOTP = (e) => {
    e.preventDefault();

    const regExForOTP = /^[0-9]{6}$/; //match 0-9 และต้องมีตัวเลข 6 ตัวเท่านั้น

    const inputTextOTP = document.getElementsByClassName('err-style')[0];
   
    if(!otp){
      setErrMsg('OTP is required.');
      inputTextOTP.classList.add('custom');
    }else if(regExForOTP.test(otp) === false){
      setErrMsg('OTP must be a 6 digit number.');
      inputTextOTP.classList.add('custom');
    }else{
      setErrMsg('');
      inputTextOTP.classList.remove('custom');
    }

  }

  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div className='container-content'>
          <h1>Verifying OTP</h1>
          <p>Check your email <span style={{color: '#2E2E2E' , fontWeight: '500'}}>d*****4@hotmail.com</span></p>
          <form onSubmit={(e) => verifyOTP(e)}>
            <input type='text' className='err-style' placeholder='Enter OTP' onChange={(e) => setOTP(e.target.value)}/>
            {errMsg && <span className='errMsg'>{errMsg}</span>}
            <button type='submit'>Confirm</button>
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