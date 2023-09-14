import React, { useState, useEffect } from 'react';
import '../stylesheets/About.css';
import img1 from '../assets/img/about/img1.jpg';
import img2 from '../assets/img/about/img2.JPEG';
import PortfolioItem from '../components/PortfolioItem';
import portfolioItems from '../assets/about.json';


function About() {
  const themes = ['all: default', 'all: recent', 'work', 'projects', 'competitions', 'life'];
  const [activeTheme, setActiveTheme] = useState('all: relevance');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  useEffect(() => {
      let items = portfolioItems.filter(item => activeTheme.split(': ')[0] === 'all' || item.theme === activeTheme);
      
      if(activeTheme === 'all: recent') {
        items.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
      }
      
      setFilteredItems(items);
  }, [activeTheme]);


  const links = [
    { name: "Youtube of MIT Class Projects", url: "https://www.youtube.com/@brillantez6272/videos"},
    { name: "GitHub", url: "https://github.com/xflynx25" },
    { name: "Handshake", url: "https://app.joinhandshake.com/stu/users/19751486"},
    //{ name: "Facebook", url: "https://www.facebook.com/profile.php?id=100031441443430"},
    //{ name: "Instagram", url: "https://www.instagram.com/implement"},
    { name: "LinkedIn", url: "https://www.linkedin.com/in/john-flynn-45318419b/" }
  ];

  //However, I am still open to consider job opportunities. 
  return (
    <div className="about">
      <div className="about-header">
        <div className="left-photos">
          <img src={img1} alt="Header" className="about-header-img" />
        </div>
        <div>
          <h1 className="about-name">John Flynn</h1>
          <p className="about-intro">
            Hello, I am a graduate from the MIT class of 2023 in Physics and EECS, 
            currently doing my M.Eng in EECS (focus in AI) with the MIT Media Lab.
            I'll graduate in Summer 2024.
          <br/><br/>

          Relentlessly pursuing automation and better abstractions for attacking hard problems. 
          
          <br/><br/>
            Scroll down to see snapshots of some of my work/projects over the years. Click the buttons to filter by theme. Select a photo to learn more.
          </p>
        <div className="links-container">
          {links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
          ))}
        </div>
        </div>
        
        <div className="right-photos">
          <img src={img2} alt="Header" className="about-header-img" />
        </div>
      </div>
      <hr className="about-divider" />
      <div className="themes-container">
        {themes.map((theme, index) => (
          <button
            key={index}
            className={`theme-button ${activeTheme === theme ? 'active' : ''}`}
            onClick={() => setActiveTheme(theme)}
          >
            {theme}
          </button>
        ))}
      </div>
      <hr className="about-divider" />
      <div className="portfolio">
        
        {portfolioItems
          .filter(item => activeTheme.split(': ')[0] === 'all' || item.theme === activeTheme)
          .sort((a, b) => {
            if (activeTheme === 'all: recent') {
              return new Date(b.date) - new Date(a.date);
            } else {
              return 0;
            }
          })
          .map((item, index) => (
            <PortfolioItem key={index} item={item} index={index} filteredItems={filteredItems} />
        ))}
      </div>
    </div>
  );
}

export default About;
