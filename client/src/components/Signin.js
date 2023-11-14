import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { CiCircleRemove } from 'react-icons/ci';

const Signin = () => {

  const navigate = useNavigate();

  const inputTextRef = useRef();
  const inputPasswordRef = useRef();

  useEffect(() => {
    setUsernameOrEmail(inputTextRef.current.defaultValue);
    setPassword(inputPasswordRef.current.defaultValue);
  }, []);

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEye);

  const signIn = (e) => {
    e.preventDefault();

    const regExForUsername = /^(?:[A-Z\d][A-Z\d_-]{5,19}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i; //math a-z A-Z 0-9 _ email และต้องมีขั้นต่ำ 6 - 20 ตัวอักษร
    const regExForPassword = /^[a-zA-Z0-9_]{8,20}$/; //math a-z A-Z 0-9 _ และต้องมีขั้นต่ำ 8 - 20 ตัวอักษร

    const inputTextUsernameOrEmail = document.getElementsByClassName('err-style')[0];
    const inputPassword = document.querySelector('.password-effect');
    const saveSignin = document.getElementById('saveSignin');
    const savePWDSignin = document.getElementById('savePWDSignin');

    if (!usernameOrEmail && !!password) {
      setErrMsg({
        usernameOrEmail: 'Username or email is required.'
      });
      inputTextUsernameOrEmail.classList.add('custom');
      inputPassword.classList.remove('custom');
    } else if (!!usernameOrEmail && !password) {
      setErrMsg({
        password: 'Password is required.'
      });
      inputTextUsernameOrEmail.classList.remove('custom');
      inputPassword.classList.add('custom');
    } else if (!usernameOrEmail && !password) {
      setErrMsg({
        usernameOrEmail: 'Username or email is required.',
        password: 'Password is required.'
      });
      inputTextUsernameOrEmail.classList.add('custom');
      inputPassword.classList.add('custom');
    } else if (!!usernameOrEmail && !!password) {
      setErrMsg({});
      inputTextUsernameOrEmail.classList.remove('custom');
      inputPassword.classList.remove('custom');

      if (regExForUsername.test(usernameOrEmail) === false) {
        setErrMsg({
          regExErrUsername: 'Username or email is not formatted.'
        });
        inputTextUsernameOrEmail.classList.add('custom');
        inputPassword.classList.remove('custom');
      } else if (regExForPassword.test(password) === false) {
        setErrMsg({
          regExErrPassword: 'Password must have 8-20 characters'
        });
        inputTextUsernameOrEmail.classList.remove('custom');
        inputPassword.classList.add('custom');
      } else {
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usernameOrEmail: usernameOrEmail,
            password: password
          })
        }).then((res) => {
          if (res.status === 400) {
            setErrMsg({
              signinErr: 'Invalid username / email or password'
            });
          } else if (res.status === 200) {
            setErrMsg('');
            if (saveSignin.checked) {
              Cookies.set('usernameOrEmail', usernameOrEmail, { expires: 7 });
              Cookies.set('password', password, { expires: 7 });
            } else {
              Cookies.remove('usernameOrEmail');
              Cookies.remove('password');
              inputTextUsernameOrEmail.value = '';
              savePWDSignin.value = '';
            }
            return res.json();
          }
        }).then((res) => {
          localStorage.setItem('token', res.token);
          navigate('/media');
        });
      }
    }
  }

  const eyePopup = () => {
    if (type === 'password') {
      setType('text');
      setIcon(faEyeSlash);
    } else {
      setType('password');
      setIcon(faEye);
    }
  }

  return (
    <div className='container'>
      <Snowfall />
      <div className='content-left'>
        <div className='container-content'>
          <h2>Sign in</h2>
          {errMsg.signinErr &&
            <div className='container-alert-box-sign-in-err'>
              <h3 className='checkSigninErr'>{errMsg.signinErr}</h3>
              <div className='container-icon-xmark-in-container-alert-box-sign-in-err'>
                <CiCircleRemove onClick={() => setErrMsg({})} className='icon-xmark-in-container-icon-xmark-in-container-alert-box-sign-in-err' />
              </div>
            </div>
          }
          <form onSubmit={(e) => signIn(e)}>
            <label>Username / Email:</label>
            <br />
            <input type='text' className='err-style' onChange={(e) => setUsernameOrEmail(e.target.value)} ref={inputTextRef} defaultValue={Cookies.get('usernameOrEmail')} />
            {errMsg.usernameOrEmail || errMsg.regExErrUsername ? <span className='errMsg'>{errMsg.usernameOrEmail}{errMsg.regExErrUsername}</span> : <></>}
            <label>Password:</label>
            <br />
            <div className='password-effect'>
              <input id='savePWDSignin' type={type} onChange={(e) => setPassword(e.target.value)} ref={inputPasswordRef} defaultValue={Cookies.get('password')} /> <FontAwesomeIcon className='icon' onClick={eyePopup} icon={icon} />
            </div>
            {errMsg && <span className='errMsg'>{errMsg.password}{errMsg.regExErrPassword}</span>}
            <div className='center-content'>
              <div className='container-remember-in-center-content'>
                <input type='checkbox' id='saveSignin' defaultChecked /> <span>Remember me</span>
              </div>
              <div className='container-forgot-password-in-center-content'>
                <Link to='/forgotPassword' className='forgotPassword'>Forgot password</Link>
              </div>
            </div>
            <button type='submit'>Sign in</button>
            <div className='buttom-content'>
              <div>
                Don't have an account?&nbsp;&nbsp;&nbsp;
              </div>
              <Link to='/signup' className='signup'>Sign up</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight />
    </div>
  );
}

export default Signin;