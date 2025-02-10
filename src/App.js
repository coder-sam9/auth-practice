import { Routes, Route, useNavigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';

function App() {

  const navigate=useNavigate()
  const checkAutoLogout=()=>{
    const currentTime = new Date().getTime();
    const loginTime=localStorage.getItem('loginTime');
    console.log(loginTime);
    
  
    const loginTenure=currentTime-parseInt(loginTime,10);
    if(loginTenure>30000){
        localStorage.removeItem('user'); 
        localStorage.removeItem('loginTime'); 
       navigate('/');
       window.location.reload()
      console.log('in the loginTenure',currentTime,parseInt(loginTime,10),loginTenure);
      
    }
   console.log(loginTenure);
  }
  useEffect(checkAutoLogout, []);
  
  
 
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage/>} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;