import { HashRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PendingSuccess from './components/PendingSuccess';
import SignupSuccess from './components/SignupSuccess';
import Media from './components/Media';
import VerifyOTP from './components/VerifyOTP';
import SearchPeopleInHamburgerMenu from './components/SearchPeopleInHamburgerMenu';
import NotificationsInHamburgerMenu from './components/NotificationsInHamburgerMenu';
import Profile from './components/Profile';
import Chat from './components/Chat';
import SocketContext from './components/SocketContext';
import React, { useState } from 'react';

function App() {
  const [logoutStatus, setLogoutStatus] = useState(false);
  
  return (
    <SocketContext>
      <HashRouter>
        <Routes>
          <Route path='/' element={localStorage.getItem('token') !== null ? <Media setLogoutStatus={setLogoutStatus}/> : <Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
          <Route path='/verifyOTP' element={<VerifyOTP />}></Route>
          <Route path='/resetPassword' element={<ResetPassword />}></Route>
          <Route path='/pendingSuccess' element={<PendingSuccess />}></Route>
          <Route path='/signupSuccess' element={<SignupSuccess />}></Route>
          <Route path='/media' element={<Media setLogoutStatus={setLogoutStatus}/>}></Route>
          <Route path='/search-people' element={<SearchPeopleInHamburgerMenu />}></Route>
          <Route path='/notifications' element={<NotificationsInHamburgerMenu />}></Route>
          <Route path='/profile/:id' element={<Profile setLogoutStatus={setLogoutStatus}/>}></Route>
          <Route path='/chat' element={<Chat setLogoutStatus={setLogoutStatus}/>}></Route>
        </Routes>
      </HashRouter>
    </SocketContext>
  );
}

export default App;