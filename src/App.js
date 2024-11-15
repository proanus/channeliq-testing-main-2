// src/App.js
import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import Clipper from './components/clipper';

const App = () => {
  const [videoUrl, setVideoUrl] = useState(''); // State to store video URL

  return (
    <GoogleOAuthProvider clientId="596956006843-hudu08glc55k62vpsn597hvn99lf0c0p.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />  {/* Login page route */}
          <Route 
            path="/home" 
            element={<HomePage setVideoUrl={setVideoUrl} />} 
          />  {/* Home page route with setVideoUrl prop */}
          <Route 
            path="/clipper" 
            element={<Clipper videoUrl={videoUrl} />} 
          />  {/* Clipper page route with videoUrl prop */}
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
