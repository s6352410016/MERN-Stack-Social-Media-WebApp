import React, { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {

  const navigate = useNavigate();
  
  const [email , setEmail] = useState('');
  const [errMsg , setErrMsg] = useState('');
  const [disable , setDisable] = useState(false);

  const sendOTP = (e) => {
    e.preventDefault();

    const regExForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //รูปแบบ email ต้องเป็น test@hotmail.com ถึงจะ match

    const inputTextEmail = document.getElementsByClassName('err-style')[0];
   
    if(!email){
      setErrMsg('Email is required.');
      inputTextEmail.classList.add('custom');
    }else if(regExForEmail.test(email) === false){
      setErrMsg('Invalid email format.');
      inputTextEmail.classList.add('custom');
    }else{
      setErrMsg('');
      inputTextEmail.classList.remove('custom');
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkEmail` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
      }).then((res) => {
        if(res.status !== 400){
          setErrMsg('Invalid email address.');
          inputTextEmail.classList.add('custom');
        }else if(res.status === 400){
          setDisable(true);
          inputTextEmail.classList.remove('custom');
          fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/sendOTP` , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email
            })
          }).then((res) => {
            if(res.status === 200){
              navigate('/verifyOTP' , {
                state: {
                  email
                }
              });
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
          <h2>Reset password</h2>
          <p>We'll send an otp for verification to your email.</p>
          <form onSubmit={(e) => sendOTP(e)}>
            <label>Email</label>
            <br/>
            <input type='text' className='err-style' onChange={(e) => setEmail(e.target.value)}/>
            {errMsg && <span className='errMsg'>{errMsg}</span>}
            <button type='submit' disabled={disable}>Send OTP</button>
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

export default ForgotPassword;