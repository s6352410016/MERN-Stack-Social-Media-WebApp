import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signin = () => {

  const [usernameOrEmail , setUsernameOrEmail] = useState('');
  const [password , setPassword] = useState('');
  const [errMsg , setErrMsg] = useState('');

  const [type , setType] = useState('password');
  const [icon , setIcon] = useState(faEye);

  const signIn = (e) => {
    e.preventDefault();

    const inputTextUsernameOrEmail = document.getElementsByClassName('err-style')[0];
    const inputPassword = document.querySelector('.password-effect');

    if(!usernameOrEmail && !!password){
      setErrMsg({
        usernameOrEmail: 'Username or email is required.'
      });
      inputTextUsernameOrEmail.classList.add('custom');
      inputPassword.classList.remove('custom');
    }else if(!!usernameOrEmail && !password){
      setErrMsg({
        password: 'Password is required.'
      });
      inputTextUsernameOrEmail.classList.remove('custom');
      inputPassword.classList.add('custom');
    }else if(!usernameOrEmail && !password){
      setErrMsg({
        usernameOrEmail: 'Username or email is required.',
        password: 'Password is required.'
      });
      inputTextUsernameOrEmail.classList.add('custom');
      inputPassword.classList.add('custom');
    }else if(!!usernameOrEmail && !!password){
      setErrMsg({});
      inputTextUsernameOrEmail.classList.remove('custom');
      inputPassword.classList.remove('custom');
    } 
  }

  const eyePopup = () => {
    if(type === 'password'){
      setType('text');
      setIcon(faEyeSlash);
    }else{
      setType('password');
      setIcon(faEye);
    }
  }

  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div>
          <h1>Welcome to BYN</h1>
          <form onSubmit={(e) => signIn(e)}>
            <label>Username / Email:</label>
            <br/>
            <input type='text' className='err-style' onChange={(e) => setUsernameOrEmail(e.target.value)}/>
            {errMsg && <span className='errMsg'>{errMsg.usernameOrEmail}</span>}
            <br/>
            <label>Password:</label>
            <br/>
            <div className='password-effect'>
              <input type={type}  onChange={(e) => setPassword(e.target.value)}/> <FontAwesomeIcon className='icon' onClick={eyePopup} icon={icon}/>
            </div>
            {errMsg && <span className='errMsg'>{errMsg.password}</span>}
            <br/>
            <div className='center-content'>
              <div>
                <input type='checkbox'/> <span>Remember me</span>
              </div>
              <Link to='/forgotPassword' className='forgotPassword'>Forgot password</Link>
            </div>
            <button type='submit'>Sign In</button>
            <div className='buttom-content'>
              <div>
                Don't have an account?&nbsp;&nbsp;&nbsp;
              </div>
              <Link to='/signup' className='signup'>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight/>
    </div>
  );
}

export default Signin;