import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;