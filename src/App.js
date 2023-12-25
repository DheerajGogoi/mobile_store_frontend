import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import NotFound from './pages/NotFound';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import ViewMobile from './pages/ViewMobile';
import Register from './pages/Register';

function App() {
  const auth = useSelector(state => state.userAuth.auth)
  console.log(auth);

  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route path="/home" element={auth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/home/:mobileId" element={auth ? <ViewMobile /> : <Navigate to="/login" />} />
        
        {/* unkown route handle */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
