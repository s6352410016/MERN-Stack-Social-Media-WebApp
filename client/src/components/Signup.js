import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';

const Signup = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div>
          <h1>Create account</h1>
          <form>
            <div className='input-head'>
              <div>
                <label>Firstname:</label>
                <br/>
                <input type='text'/>
              </div>
              <div>
                <label>Lastname:</label>
                <br/>
                <input type='text'/>
              </div>
            </div>
            <label>Username:</label>
            <br/>
            <input type='text'/>
            <br/>
            <label>Password:</label>
            <br/>
            <input type='password'/>
            <br/>
            <label>Email:</label>
            <br/>
            <input type='email'/>
            <button>Sign Up</button>
            <div className='buttom-content'>
              <div>
                Have already an account?&nbsp;&nbsp;&nbsp;
              </div>
              <Link to='/' className='signup'>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight/>
    </div>
  )
}

export default Signup;