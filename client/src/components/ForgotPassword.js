import React from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';

const ForgotPassword = () => {
  return (
    <div className='container'>
      <Snowfall/>
      <div className='content-left'>
        <div>
          <h1>Reset password</h1>
          <form>
            <label>Email</label>
            <br/>
            <input type='email'/>
            <br/>
            <label>New password</label>
            <br/>
            <input type='password'/>
            <button>Reset</button>
            <div className='buttom-content'>
              <Link to='/' className='signup'>Back to sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight/>
    </div>
  )
}

export default ForgotPassword;