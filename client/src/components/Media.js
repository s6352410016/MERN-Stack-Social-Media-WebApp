import React, { useEffect } from 'react';
import { useState } from 'react';

const Media = () => {

  const [userData , setUserData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/authUser' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    }).then((res) => {
      if(res.status === 401){
        window.location.href = '/';
      }else if(res.status === 403){
        window.location.href = '/';
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
    window.location.href = '/';
  }

  return (
    <div>
      <h1>Hello {userData.firstname} {userData.lastname}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Media;