import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;