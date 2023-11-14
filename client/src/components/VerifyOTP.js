import React from 'react';
import {Link , useLocation , useNavigate} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';

const VerifyOTP = () => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const emailFromPrevPage = state.email;
  
  const [otp , setOTP] = useState('');
  const [errMsg , setErrMsg] = useState('');
  const [resendOTPMSGSuccess , setResendOTPMSGSuccess] = useState('');
  const [resendOTPMSGErr , setResendOTPMSGErr] = useState('');

  const [email , domain] = state.email.split('@');
  const firstTextEmail = email[0];
  const lastTextEmailLength = email.length - 1;
  const lastTextEmail = email[lastTextEmailLength];
  const asteriskEmail = new Array(email.slice(1 , email.length - 1).length + 1).join('*');
  const emailObscureWithAsterisk = `${firstTextEmail}${asteriskEmail}${lastTextEmail}@${domain}`;

  const resendOTP = () => {
    fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/resendOTP` , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: state.email,
      })
    }).then((res) => {
      if(res.status === 200){
        setResendOTPMSGSuccess('Resend otp has been successfully.');
      }else{
        setResendOTPMSGErr('An error occurred.');
      }
    });
  }

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
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/verifyOTP` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: state.email,
          otp: otp
        })
      }).then((res) => {
        return res.json();
      }).then((res) => {
        if(res.msg === 'Invalid email address.'){
          setErrMsg('Invalid otp.');
          inputTextOTP.classList.add('custom');
        }else if(res.msg === 'OTP has expire.'){
          setErrMsg('OTP has expire.');
          inputTextOTP.classList.add('custom');
        }else if(res.msg === 'Invalid otp.'){
          setErrMsg('Invalid otp.');
          inputTextOTP.classList.add('custom');
        }else if(res.msg === 'Verify otp successfully.'){
          inputTextOTP.classList.remove('custom');
          navigate('/resetPassword' , {
            state: {
              emailFromPrevPage
            }
          });
        }
      });
    }

  }

  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div className='container-content'>
          <h2>Verifying OTP</h2>
          {resendOTPMSGSuccess && 
            <div className='container-alert-resend-otp-sucessess'>
              <h3 className='msg-success-in-container-alert-resend-otp-sucessess'>{resendOTPMSGSuccess}</h3>
              <div className='container-icon-xmark-in-container-alert-resend-otp-sucessess'>
                <CiCircleRemove onClick={() => setResendOTPMSGSuccess('')} className='icon-xmark-in-container-icon-xmark-in-container-alert-resend-otp-sucessess'/>
              </div>
            </div>
          }
          {resendOTPMSGErr && <p style={{height: '3rem' , display: 'flex' , justifyContent: 'center' , alignItems: 'center' , backgroundColor: '#F6DBDB' , color: '#fff'}}>{resendOTPMSGErr}</p>}
          <p>OTP has been sent to email.</p>
          <p>Check your email <span style={{color: '#2E2E2E' , fontWeight: '500'}}>{emailObscureWithAsterisk}</span></p>
          <form onSubmit={(e) => verifyOTP(e)}>
            <input type='text' className='err-style' placeholder='Enter OTP' onChange={(e) => setOTP(e.target.value)}/>
            {errMsg && <span style={{marginBottom: '0'}} className='errMsg'>{errMsg}</span>}
            <button type='submit'>Confirm</button>
            <div className='resend-otp'>
              <span className='first-span'>Don't receive an otp?</span>&nbsp;&nbsp;&nbsp;<span className='last-span' onClick={resendOTP}>Click to resend</span>
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