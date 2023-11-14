import React from 'react';
import {Link , useLocation , useNavigate} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft , faEye , faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Cookies from 'js-cookie';

const ResetPassword = () => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const emailFromPrevPage = state.emailFromPrevPage;
  
  const [newPassword , setNewPassword] = useState('');
  const [confirmNewPassword , setConfirmNewPassword] = useState('');
  const [errMsg , setErrMsg] = useState('');

  const [type1 , setType1] = useState('password');
  const [icon1, setIcon1] = useState(faEye);
  const [type2 , setType2] = useState('password');
  const [icon2, setIcon2] = useState(faEye);

  const resetPassword = (e) => {
    e.preventDefault();

    const regExForPassword = /^[a-zA-Z0-9_]{8,20}$/; //math a-z A-Z 0-9 _ และต้องมีขั้นต่ำ 8 - 20 ตัวอักษร

    const inputNewPassword = document.getElementsByClassName('password-effect')[0];
    const inputConfirmNewPassword = document.getElementsByClassName('password-effect')[1];

    if(!newPassword && !confirmNewPassword){
      setErrMsg({
        ErrNewPassword: 'New password is required.',
        ErrConfirmNewPassword: 'Confirm new password is required.'
      });
      inputNewPassword.classList.add('custom');
      inputConfirmNewPassword.classList.add('custom');
    }else if(!newPassword){
      setErrMsg({
        ErrNewPassword: 'New password is required.'
      });
      inputNewPassword.classList.add('custom');
      inputConfirmNewPassword.classList.remove('custom');
    }else if(!confirmNewPassword){
      setErrMsg({
        ErrConfirmNewPassword: 'Confirm new password is required.'
      });
      inputNewPassword.classList.remove('custom');
      inputConfirmNewPassword.classList.add('custom');
    }else if(newPassword !== confirmNewPassword){
      setErrMsg({
        ErrPasswordNotMatch: 'Password do not match.'
      });
      inputNewPassword.classList.add('custom');
      inputConfirmNewPassword.classList.add('custom');
    }else if(regExForPassword.test(newPassword) === false && regExForPassword.test(confirmNewPassword) === false){
      setErrMsg({
        RegExErrNewPassword: 'A strong password must have 8-20 characters and contain upper & lowercase letters.',
        RegExErrConfirmNewPassword: 'A strong password must have 8-20 characters and contain upper & lowercase letters.'
      });
      inputNewPassword.classList.add('custom');
      inputConfirmNewPassword.classList.add('custom');
    }else if(regExForPassword.test(newPassword) === false){
      setErrMsg({
        RegExErrNewPassword: 'A strong password must have 8-20 characters and contain upper & lowercase letters.'
      });
      inputNewPassword.classList.add('custom');
      inputConfirmNewPassword.classList.remove('custom');
    }else if(regExForPassword.test(confirmNewPassword) === false){
      setErrMsg({
        RegExErrConfirmNewPassword: 'A strong password must have 8-20 characters and contain upper & lowercase letters.'
      });
      inputNewPassword.classList.remove('custom');
      inputConfirmNewPassword.classList.add('custom');
    }else{
      setErrMsg({});
      inputNewPassword.classList.remove('custom');
      inputConfirmNewPassword.classList.remove('custom');
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/resetPassword` , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailFromPrevPage,
          newPassword: confirmNewPassword
        })
      }).then((res) => {
        if(res.status === 200){
          navigate('/pendingSuccess');
          Cookies.remove('usernameOrEmail');
          Cookies.remove('password');
        }
      });
    }
    
  }

  const eyePopup1 = () => {
    if(type1 === 'password'){
      setType1('text');
      setIcon1(faEyeSlash);
    }else{
      setType1('password');
      setIcon1(faEye);
    }
  }

  const eyePopup2 = () => {
    if(type2 === 'password'){
      setType2('text');
      setIcon2(faEyeSlash);
    }else{
      setType2('password');
      setIcon2(faEye);
    }
  }

  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div className='container-content'>
          <h2>Change password</h2>
          <form onSubmit={(e) => resetPassword(e)}>
            <label>New password:</label>
            <br/>
            <div className='password-effect'>
              <input type={type1}  onChange={(e) => setNewPassword(e.target.value)}/> <FontAwesomeIcon className='icon' onClick={eyePopup1} icon={icon1}/>
            </div>
            {errMsg && <span className='errMsg'>{errMsg.ErrNewPassword}{errMsg.ErrPasswordNotMatch}{errMsg.RegExErrNewPassword}</span>}
            <label>Confirm new password:</label>
            <br/>
            <div className='password-effect'>
              <input type={type2}  onChange={(e) => setConfirmNewPassword(e.target.value)}/> <FontAwesomeIcon className='icon' onClick={eyePopup2} icon={icon2}/>
            </div>
            {errMsg && <span className='errMsg' style={{marginBottom: '0'}}>{errMsg.ErrConfirmNewPassword}{errMsg.ErrPasswordNotMatch}{errMsg.RegExErrConfirmNewPassword}</span>}
            <button type='submit'>Confirm</button>
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

export default ResetPassword;