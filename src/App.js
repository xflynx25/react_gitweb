import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './stylesheets/App.css';
import Taskbar from './components/Taskbar';

import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Academics from './pages/Academics';
import Articles from './pages/Articles';
import Wiki from './pages/Wiki';
import Article from './components/Article';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Taskbar />
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/resume" element={<Resume />}></Route>
          <Route path="/academics" element={<Academics />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/wiki" element={<Wiki />}></Route>
          <Route path="/article/:id" element={<Article />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
