import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Chat from './pages/chat';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
