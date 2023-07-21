import React, { useState, useEffect } from 'react';
import '../stylesheets/About.css';
import img1 from '../assets/img/about/img1.JPEG';
import img2 from '../assets/img/about/img2.JPEG';
import PortfolioItem from '../components/PortfolioItem';
import portfolioItems from '../assets/about.json';


function About() {
  const themes = ['all: relevance', 'all: recent', 'work', 'projects', 'competitions', 'life'];
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
    { name: "LinkedIn", url: "https://www.linkedin.com/in/john-flynn-45318419b/" },
    { name: "GitHub", url: "https://github.com/xflynx25" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100031441443430"},
    { name: "Instagram", url: "https://www.instagram.com/implement"},
    { name: "Project Youtube", url: "https://www.youtube.com/@brillantez6272/videos"},
  ];

  return (
    <div className="about">
      <div className="about-header">
        <div className="left-photos">
          <img src={img1} alt="Header" className="about-header-img" />
        </div>
        <div>
          <h1 className="about-name">John Flynn</h1>
          <p className="about-intro">
            Hello, I am a graduate from the MIT class of 2023 in Physics and EECS. 
            I am currently looking for work for the coming year as well as considering my M.Eng at MIT. 
          <br/><br/>
            I am a computing generalist with experience working across the entire stack, from physics research to circuits to assembly, embedded, security, web design, data, and ML. 
            I am also a math enthusiast and enjoy working on quantitative problems.
          <br/><br/>
            My academic goals are always to increase understanding of physics, mathematics, and the ways to design systems in this world. 
            But in my free time, I enjoy reading, programming, teaching, physical competition, performing music, taking courses, travelling, trying new things, being outside, and quality time with others. 
          <br/><br/>
            Scroll down to see some snapshots of things I have been proud of over the years. Click the buttons to filter by theme.
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