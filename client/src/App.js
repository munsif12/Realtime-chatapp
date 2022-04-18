import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Chat from './pages/chat';
import TestNotification from './pages/TestNotification';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/test" element={<TestNotification />} />
      </Routes>
    </div>
  );
}

export default App;
