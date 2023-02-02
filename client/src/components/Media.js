import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Media = () => {

  const navigate = useNavigate();

  const [userData , setUserData] = useState('');

  useEffect(() => {
    fetch('https://bynsocial.onrender.com/authUser' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if(res.status === 401){
        navigate('/');
      }else if(res.status === 403){
        navigate('/');
      }else{
        return res.json();
      }
    }).then((res) => {
      setUserData({
        firstname: res.firstname,
        lastname: res.lastname
      });
    });
  } , []);

  const signOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div>
      <h1>Hello {userData.firstname} {userData.lastname}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Media;