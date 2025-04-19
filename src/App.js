import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Views/Home';
import Graphs from './Views/Graphs';
import CompletedTasks from './Views/CompletedTasks/CompletedTasks';
import Navbar from './Components/Navbar/Navbar';
import FileContribution from './Views/FileContributions/FileContribution';
import MarkdownRenderer from './Views/Documentation/Documentation';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/graphs/:repo/*' element={<Graphs />} />
          <Route path='/completed-tasks' element={<CompletedTasks />} />
          <Route path='/file-contribution/:name' element={<FileContribution />} />
          <Route path='/documentation' element={<MarkdownRenderer />} />
          <Route path='*' element={<h1>404 Not Found</h1>} /> {/* Fallback Route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
