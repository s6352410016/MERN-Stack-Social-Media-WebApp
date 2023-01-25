import React from 'react';
import {Link} from 'react-router-dom';
import loginLogo from './images/loginLogo.svg';
import './css/loginPage.css';

const Signup = () => {
  return (
    <div className='container'>
      <div className='content-left'>
        <h1>Create member</h1>
        <form>
          <label>Fullname</label>
          <br/>
          <input type='text'/>
          <br/>
          <label>Username</label>
          <br/>
          <input type='text'/>
          <br/>
          <label>Password</label>
          <br/>
          <input type='password'/>
          <br/>
          <label>Email</label>
          <br/>
          <input type='email'/>
          <br/>
          <button>Sign Up</button>
          <div className='buttom-content'>
            <div>
              Have already an account?&nbsp;&nbsp;&nbsp;
            </div>
            <Link to='/' className='signup'>Sign in</Link>
          </div>
        </form>
      </div>
      <div className='content-right'>
        <img src={loginLogo} alt='loginLogo'/>
      </div>
    </div>
  )
}

export default Signup;