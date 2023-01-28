import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';
import PendingSuccess from './components/PendingSuccess';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;