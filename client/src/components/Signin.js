import React from 'react';
import {Link} from 'react-router-dom';
import loginLogo from './images/loginLogo.svg';
import './css/loginPage.css';
import Snowfall from 'react-snowfall';

const Signin = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <h1>Welcome to BYN</h1>
        <form>
          <label>Username / Email</label>
          <br/>
          <input type='text'/>
          <br/>
          <label>Password</label>
          <br/>
          <input type='password'/>
          <br/>
          <div className='center-content'>
            <div>
              <input type='checkbox'/> <span>Remember me</span>
            </div>
            <Link to='/forgotPassword' className='forgotPassword'>Forgot password</Link>
          </div>
          <br/>
          <button>Sign In</button>
          <div className='buttom-content'>
            <div>
              Don't have an account?&nbsp;&nbsp;&nbsp;
            </div>
            <Link to='/signup' className='signup'>Sign up</Link>
          </div>
        </form>
      </div>
      <div className='content-right'>
        <img src={loginLogo} alt='loginLogo'/>
      </div>
    </div>
  );
}

export default Signin;