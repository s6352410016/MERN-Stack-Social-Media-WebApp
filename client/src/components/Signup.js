import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const Signup = () => {

  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [errMsg , setErrMsg] = useState('');
  
  const [type , setType] = useState('password');
  const [icon , setIcon] = useState(faEye);

  const signIn = (e) => {
    e.preventDefault();
    
    const regExForFullname = /^[ก-ฮa-zA-Z\D]+$/; //match ก-ฮ a-z A-Z แต่จะไม่ match ตัวเลข 0-9
    const regExForUsername = /^[a-zA-Z0-9_]{6,20}$/; //math a-z A-Z 0-9 _ และต้องมีขั้นต่ำ 6 - 20 ตัวอักษร
    const regExForPassword = /^[a-zA-Z0-9_]{8,20}$/; //math a-z A-Z 0-9 _ และต้องมีขั้นต่ำ 8 - 20 ตัวอักษร
    const regExForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //รูปแบบ email ต้องเป็น test@hotmail.com ถึงจะ match

    const inputTextFirstname = document.getElementsByClassName('err-style')[0];
    const inputTextLastname = document.getElementsByClassName('err-style')[1];
    const inputTextUsername = document.getElementsByClassName('err-style')[2];
    const inputPassword = document.querySelector('.password-effect');
    const inputTextEmail = document.getElementsByClassName('err-style')[3];
    

    if(!firstName && !!lastName && !!username && !!password && !!email){
      setErrMsg({
        firstname: 'Firstname is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !lastName && !!username && !!password && !!email){
      setErrMsg({
        lastname: 'Lastname is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !username && !!password && !!email){
      setErrMsg({
        username: 'Username is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !!username && !password && !!email){
      setErrMsg({
        password: 'Password is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !!username && !!password && !email){
      setErrMsg({
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !lastName && !!username && !!password && !!email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');  
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !lastName && !username && !!password && !!email){
      setErrMsg({
        lastname: 'Lastname is required.',
        username: 'Username is required.',
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !username && !password && !!email){
      setErrMsg({
        username: 'Username is required.',
        password: 'Password is required.',
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !!username && !password && !email){
      setErrMsg({
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !!lastName && !!username && !!password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !!lastName && !username && !!password && !!email){
      setErrMsg({
        firstname: 'Firstname is required.',
        username: 'Username is required.',
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!firstName && !lastName && !username && !!password && !!email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        username: 'Username is required.',
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !lastName && !username && !password && !!email){
      setErrMsg({
        lastname: 'Lastname is required.',
        username: 'Username is required.',
        password: 'Password is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !username && !password && !email){
      setErrMsg({
        username: 'Username is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !!lastName && !!username && !password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !lastName && !!username && !!password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !!lastName && !username && !!password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        username: 'Username is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    }else if(!!firstName && !lastName && !!username && !password && !!email){
      setErrMsg({
        lastname: 'Lastname is required.',
        password: 'Password is required.',
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!firstName && !lastName && !!username && !password && !!email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        password: 'Password is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!!firstName && !!lastName && !username && !!password && !email){
      setErrMsg({
        username: 'Username is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    }else if(!!firstName && !lastName && !!username && !password && !email){
      setErrMsg({
        lastname: 'Lastname is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!!firstName && !lastName && !username && !password && !email){
      setErrMsg({
        lastname: 'Lastname is required.',
        username: 'Username is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !!lastName && !username && !password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        username: 'Username is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !lastName && !!username && !password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !lastName && !username && !!password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        username: 'Username is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    }else if(!firstName && !lastName && !username && !password && !!email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        username: 'Username is required.',
        password: 'Password is required.',
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    }else if(!firstName && !lastName && !username && !password && !email){
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.',
        username: 'Username is required.',
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    }else if(!!firstName && !!lastName && !!username && !!password && !!email){
      setErrMsg();
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');

      if(regExForFullname.test(firstName) === false && regExForFullname.test(lastName) === false){
        setErrMsg({
          regExErrFirstname: 'Invalid firstname format.',
          regExErrLastname: 'Invalid lastname format.'
        });
        inputTextFirstname.classList.add('custom-special');
        inputTextLastname.classList.add('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      }else if(regExForFullname.test(firstName) === false){
        setErrMsg({
          regExErrFirstname: 'Invalid firstname format.'
        });
        inputTextFirstname.classList.add('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      }else if(regExForFullname.test(lastName) === false){
        setErrMsg({
          regExErrLastname: 'Invalid lastname format.'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.add('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      }else if(regExForUsername.test(username) === false){
        setErrMsg({
          regExErrUsername: 'Username should be ( a-z , A-Z , _ ) or number and must have 6-20 characters.'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.add('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      }else if(regExForPassword.test(password) === false){
        setErrMsg({
          regExErrPassword: 'A strong password must have 8-20 characters and contain upper & lowercase letters.'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.add('custom');
        inputTextEmail.classList.remove('custom');
      }else if(regExForEmail.test(email) === false){
        setErrMsg({
          regExErrEmail: 'Please enter a valid email address for example example@domain.com'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.add('custom');
      }
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
        <div className='container-content'>
          <h1>Create account</h1>
          <form onSubmit={(e) => signIn(e)}>
            <div className='input-head'>
              <div>
                <label>Firstname:</label>
                <br/>
                <input type='text' className='err-style' onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div>
                <label>Lastname:</label>
                <br/>
                <input type='text' className='err-style' onChange={(e) => setLastName(e.target.value)}/>
              </div>
            </div>
            <div className='errMsg-container'>
              {errMsg && <span className='errMsg' >{errMsg.firstname}{errMsg.regExErrFirstname}</span>}
              {errMsg && <span className='errMsg' style={{textAlign: 'start'}}>{errMsg.lastname}{errMsg.regExErrLastname}</span>}
            </div>
            <label>Username:</label>
            <br/>
            <input type='text' className='err-style' onChange={(e) => setUsername(e.target.value)}/>
            {errMsg && <span className='errMsg'>{errMsg.username}{errMsg.regExErrUsername}</span>}
            <br/>
            <label>Password:</label>
            <br/>
            <div className='password-effect'>
              <input type={type}  onChange={(e) => setPassword(e.target.value)}/> <FontAwesomeIcon onClick={eyePopup} className='icon' icon={icon}/>
            </div>
            {errMsg && <span className='errMsg'>{errMsg.password}{errMsg.regExErrPassword}</span>}
            <br/>
            <label>Email:</label>
            <br/>
            <input type='text' className='err-style' onChange={(e) => setEmail(e.target.value)}/>
            {errMsg && <span className='errMsg'>{errMsg.email}{errMsg.regExErrEmail}</span>}
            <button type='submit'>Sign Up</button>
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