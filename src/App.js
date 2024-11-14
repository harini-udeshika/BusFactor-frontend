import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Views/Home';
import Graphs from './Views/Graphs';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/graphs' element={<Graphs />} />
        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App