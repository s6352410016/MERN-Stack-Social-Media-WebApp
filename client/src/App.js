import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';
import PendingSuccess from './components/PendingSuccess';
import SignupSuccess from './components/SignupSuccess';
import Homepage from './components/Homepage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
          <Route path='/verifyOTP' element={<VerifyOTP/>}></Route>
          <Route path='/resetPassword' element={<ResetPassword/>}></Route>
          <Route path='/pendingSuccess' element={<PendingSuccess/>}></Route>
          <Route path='/signupSuccess' element={<SignupSuccess/>}></Route>
          <Route path='/homepage' element={<Homepage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;