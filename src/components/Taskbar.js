import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/Taskbar.css';
import logo from '../assets/img/logo.png';

function Taskbar() {
  const location = useLocation();

  const getLinkClassName = (path) => {
    const isActive = location.pathname === path;
    return `taskbar-button taskbar-item ${isActive ? 'active' : ''}`;
  };

  return (
    <div className="taskbar">
      <Link to="/game">
        <img src={logo} alt="SadLogo" className="logo-image taskbar-item" />
      </Link>
      <Link to="/" className={getLinkClassName('/')}>
        About
      </Link>
      <Link to="/resume" className={getLinkClassName('/resume')}>
        Resume
      </Link>
      <Link to="/academics" className={getLinkClassName('/academics')}>
        Academics
      </Link>
    </div>
  );
}

export default Taskbar;
/*
      <Link to="/articles" className={getLinkClassName('/articles')}>
        Articles
      </Link>
      <Link to="/wiki" className={getLinkClassName('/wiki')}>
        Wiki
      </Link>
    </div>
  );
}

export default Taskbar;
*/