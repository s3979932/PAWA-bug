// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from './route/config/RouteConfig';

function App() {
  return (
    <Router>
      <RouteConfig />
    </Router>
  );
}

export default App;
