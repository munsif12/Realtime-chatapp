import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Chat from './pages/chat';
import TestNotification from './pages/TestNotification';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { checkToken } from './redux/slices/auth';
import AppLayout from './layout/appLayout';
import 'antd/dist/antd.css';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkToken())
    console.log('App.js is running');
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/chat" element={
          <ProtectedRoute>
            <AppLayout>
              <Chat />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route exact path="/test" element={<TestNotification />} />
      </Routes>
    </div>
  );
}

export default App;
