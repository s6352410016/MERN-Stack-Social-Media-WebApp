import React from 'react';
import {Link} from 'react-router-dom';
import loginLogo from './images/loginLogo.svg';
import './css/loginPage.css';
import Snowfall from 'react-snowfall';

const ForgotPassword = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <h1>Reset password</h1>
        <form>
          <label>Email</label>
          <br/>
          <input type='email'/>
          <br/>
          <label>Current password</label>
          <br/>
          <input type='password'/>
          <br/>
          <label>New password</label>
          <br/>
          <input type='password'/>
          <br/>
          <button style={{marginTop: '15px'}}>Reset</button>
          <div className='buttom-content'>
            <Link to='/' className='signup'>Back to sign in</Link>
          </div>
        </form>
      </div>
      <div className='content-right'>
        <img src={loginLogo} alt='loginLogo'/>
      </div>
    </div>
  )
}

export default ForgotPassword;