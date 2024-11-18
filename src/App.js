import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Views/Home';
import Graphs from './Views/Graphs';
import CompletedTasks from './Views/CompletedTasks';
import Navbar from './Components/Navbar/Navbar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/graphs' element={<Graphs />} />
          <Route path='/completed-tasks' element={<CompletedTasks />} />
          <Route path='*' element={<h1>404 Not Found</h1>} /> {/* Fallback Route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
