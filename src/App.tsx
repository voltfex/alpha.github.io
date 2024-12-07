import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CardPage, CreateCard, Home } from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/create-card" element={<CreateCard />} />
      </Routes>
    </Router>
  );
};

export default App;
