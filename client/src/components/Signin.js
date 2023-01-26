import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';

const Signin = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div>
          <h1>Welcome to BYN</h1>
          <form>
            <label>Username / Email:</label>
            <br/>
            <input type='text'/>
            <br/>
            <label>Password:</label>
            <br/>
            <input type='password'/>
            <br/>
            <div className='center-content'>
              <div>
                <input type='checkbox'/> <span>Remember me</span>
              </div>
              <Link to='/forgotPassword' className='forgotPassword'>Forgot password</Link>
            </div>
            <button>Sign In</button>
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