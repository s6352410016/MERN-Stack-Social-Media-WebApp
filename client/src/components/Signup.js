import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/ContentLeft.css';
import Snowfall from 'react-snowfall';
import ContentRight from './ContentRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { SocketIOContext } from './SocketContext';

const Signup = () => {
  const { socket } = useContext(SocketIOContext);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEye);

  const signIn = (e) => {
    e.preventDefault();

    const regExForFullname = /^([ก-ฮa-zA-Z\D])[^\s]+$/; //match ก-ฮ a-z A-Z และห้ามมี space แต่จะไม่ match ตัวเลข 0-9
    const regExForUsername = /^[a-zA-Z0-9_]{6,20}$/; //math a-z A-Z 0-9 _ และต้องมีขั้นต่ำ 6 - 20 ตัวอักษร
    const regExForPassword = /^[a-zA-Z0-9_]{8,20}$/; //math a-z A-Z 0-9 _ และต้องมีขั้นต่ำ 8 - 20 ตัวอักษร
    const regExForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //รูปแบบ email ต้องเป็น test@hotmail.com ถึงจะ match

    const inputTextFirstname = document.getElementsByClassName('err-style')[0];
    const inputTextLastname = document.getElementsByClassName('err-style')[1];
    const inputTextUsername = document.getElementsByClassName('err-style')[2];
    const inputPassword = document.querySelector('.password-effect');
    const inputTextEmail = document.getElementsByClassName('err-style')[3];

    if (!firstName && !!lastName && !!username && !!password && !!email) {
      setErrMsg({
        firstname: 'Firstname is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !lastName && !!username && !!password && !!email) {
      setErrMsg({
        lastname: 'Lastname is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !!lastName && !username && !!password && !!email) {
      setErrMsg({
        username: 'Username is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !!lastName && !!username && !password && !!email) {
      setErrMsg({
        password: 'Password is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !!lastName && !!username && !!password && !email) {
      setErrMsg({
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    } else if (!firstName && !lastName && !!username && !!password && !!email) {
      setErrMsg({
        firstname: 'Firstname is required.',
        lastname: 'Lastname is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !lastName && !username && !!password && !!email) {
      setErrMsg({
        lastname: 'Lastname is required.',
        username: 'Username is required.',
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !!lastName && !username && !password && !!email) {
      setErrMsg({
        username: 'Username is required.',
        password: 'Password is required.',
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!!firstName && !!lastName && !!username && !password && !email) {
      setErrMsg({
        password: 'Password is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.add('custom');
    } else if (!firstName && !!lastName && !!username && !!password && !email) {
      setErrMsg({
        firstname: 'Firstname is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    } else if (!firstName && !!lastName && !username && !!password && !!email) {
      setErrMsg({
        firstname: 'Firstname is required.',
        username: 'Username is required.',
      });
      inputTextFirstname.classList.add('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!firstName && !lastName && !username && !!password && !!email) {
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
    } else if (!!firstName && !lastName && !username && !password && !!email) {
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
    } else if (!!firstName && !!lastName && !username && !password && !email) {
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
    } else if (!firstName && !!lastName && !!username && !password && !email) {
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
    } else if (!firstName && !lastName && !!username && !!password && !email) {
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
    } else if (!firstName && !!lastName && !username && !!password && !email) {
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
    } else if (!!firstName && !lastName && !!username && !password && !!email) {
      setErrMsg({
        lastname: 'Lastname is required.',
        password: 'Password is required.',
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.add('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.add('custom');
      inputTextEmail.classList.remove('custom');
    } else if (!firstName && !lastName && !!username && !password && !!email) {
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
    } else if (!!firstName && !!lastName && !username && !!password && !email) {
      setErrMsg({
        username: 'Username is required.',
        email: 'Email is required.'
      });
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.add('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.add('custom');
    } else if (!!firstName && !lastName && !!username && !password && !email) {
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
    } else if (!!firstName && !lastName && !username && !password && !email) {
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
    } else if (!firstName && !!lastName && !username && !password && !email) {
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
    } else if (!firstName && !lastName && !!username && !password && !email) {
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
    } else if (!firstName && !lastName && !username && !!password && !email) {
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
    } else if (!firstName && !lastName && !username && !password && !!email) {
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
    } else if (!firstName && !lastName && !username && !password && !email) {
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
    } else if (!!firstName && !!lastName && !!username && !!password && !!email) {
      setErrMsg();
      inputTextFirstname.classList.remove('custom-special');
      inputTextLastname.classList.remove('custom-special');
      inputTextUsername.classList.remove('custom');
      inputPassword.classList.remove('custom');
      inputTextEmail.classList.remove('custom');

      if (regExForFullname.test(firstName) === false && regExForFullname.test(lastName) === false) {
        setErrMsg({
          regExErrFirstname: 'Invalid firstname format.',
          regExErrLastname: 'Invalid lastname format.'
        });
        inputTextFirstname.classList.add('custom-special');
        inputTextLastname.classList.add('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      } else if (regExForFullname.test(firstName) === false) {
        setErrMsg({
          regExErrFirstname: 'Invalid firstname format.'
        });
        inputTextFirstname.classList.add('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      } else if (regExForFullname.test(lastName) === false) {
        setErrMsg({
          regExErrLastname: 'Invalid lastname format.'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.add('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      } else if (regExForUsername.test(username) === false) {
        setErrMsg({
          regExErrUsername: 'Username should be ( a-z , A-Z , _ ) or number and must have 6-20 characters.'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.add('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.remove('custom');
      } else if (regExForPassword.test(password) === false) {
        setErrMsg({
          regExErrPassword: 'A strong password must have 8-20 characters and contain upper & lowercase letters.'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.add('custom');
        inputTextEmail.classList.remove('custom');
      } else if (regExForEmail.test(email) === false) {
        setErrMsg({
          regExErrEmail: 'Please enter a valid email address for example example@domain.com'
        });
        inputTextFirstname.classList.remove('custom-special');
        inputTextLastname.classList.remove('custom-special');
        inputTextUsername.classList.remove('custom');
        inputPassword.classList.remove('custom');
        inputTextEmail.classList.add('custom');
      } else {
        fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkUsername`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username
          })
        }).then((res) => {
          if (res.status === 400) {
            setErrMsg({
              username: 'Username is already exist.'
            });
            inputTextFirstname.classList.remove('custom-special');
            inputTextLastname.classList.remove('custom-special');
            inputTextUsername.classList.add('custom');
            inputPassword.classList.remove('custom');
            inputTextEmail.classList.remove('custom');
          } else if (res.status === 200) {
            fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkEmail`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email
              })
            }).then((res) => {
              if (res.status === 400) {
                setErrMsg({
                  email: 'Email is already exist.'
                });
                inputTextFirstname.classList.remove('custom-special');
                inputTextLastname.classList.remove('custom-special');
                inputTextUsername.classList.remove('custom');
                inputPassword.classList.remove('custom');
                inputTextEmail.classList.add('custom');
              } else if (res.status === 200) {
                fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    username: username,
                    password: password,
                    email: email
                  })
                }).then((res) => {
                  if (res.status === 201) {
                    socket.current?.emit('signUp');
                    Cookies.remove('usernameOrEmail');
                    Cookies.remove('password');
                    return res.json();
                  }
                }).then((res) => {
                  // localStorage.setItem('token', res.token);
                  navigate('/signupSuccess');
                });
              }
            });
          }
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
          <h2>Sign up</h2>
          <form onSubmit={(e) => signIn(e)}>
            <div className='input-head'>
              <div className='container-fullname-of-user-in-form'>
                <label>Firstname:</label>
                <br />
                <input type='text' className='err-style' onChange={(e) => setFirstName(e.target.value)} />
                <div style={{ display: 'none' }} className='Errmsg-popup-in-768px'>{errMsg && <span className='errMsg' >{errMsg.firstname}{errMsg.regExErrFirstname}</span>}</div>
              </div>
              <div className='container-fullname-of-user-in-form'>
                <label>Lastname:</label>
                <br />
                <input type='text' className='err-style' onChange={(e) => setLastName(e.target.value)} />
                <div style={{ display: 'none' }} className='Errmsg-popup-in-768px'>{errMsg && <span className='errMsg' style={{ textAlign: 'start' }}>{errMsg.lastname}{errMsg.regExErrLastname}</span>}</div>
              </div>
            </div>
            <div className='errMsg-container' style={{ marginBottom: '0' }}>
              {errMsg && <span className='errMsg' >{errMsg.firstname}{errMsg.regExErrFirstname}</span>}
              {errMsg && <span className='errMsg' style={{ textAlign: 'start' }}>{errMsg.lastname}{errMsg.regExErrLastname}</span>}
            </div>
            <label>Username:</label>
            <br />
            <input type='text' className='err-style' onChange={(e) => setUsername(e.target.value)} />
            {errMsg && <span className='errMsg'>{errMsg.username}{errMsg.regExErrUsername}</span>}
            <label>Password:</label>
            <br />
            <div className='password-effect'>
              <input type={type} onChange={(e) => setPassword(e.target.value)} /> <FontAwesomeIcon onClick={eyePopup} className='icon' icon={icon} />
            </div>
            {errMsg && <><span className='errMsg'>{errMsg.password}{errMsg.regExErrPassword}</span></>}
            <label>Email:</label>
            <br />
            <input type='text' className='err-style' onChange={(e) => setEmail(e.target.value)} />
            {errMsg && <span style={{ marginBottom: '0' }} className='errMsg'>{errMsg.email}{errMsg.regExErrEmail}</span>}
            <button type='submit'>Sign up</button>
            <div className='buttom-content'>
              <div>
                Have already an account?&nbsp;&nbsp;&nbsp;
              </div>
              <Link to='/' className='signup'>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <ContentRight />
    </div>
  )
}

export default Signup;