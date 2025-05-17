import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Register from './Visitors';
import Feedback from './Feedback';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/feedback" element={<Feedback />} />
        </Routes>
    </Router>
  );
}

export default App