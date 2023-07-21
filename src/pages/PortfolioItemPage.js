import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import portfolioItems from '../assets/about.json';
import '../stylesheets/PortfolioItemPage.css';



async function loadImage(item, num) {
  const extensions = ['JPEG', 'png', 'jpg', 'jpeg', 'JPG'];
  const results = await Promise.allSettled(
    extensions.map(ext => import(`../assets/img/about/${item.folder}/im${num}.${ext}`))
  );
  
  const successfulResult = results.find(result => result.status === 'fulfilled');

  return successfulResult?.value.default;
}

function PortfolioItemPage() {
    const { folder } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const currentIndex = location.state?.index || 0;
    const item = portfolioItems.find(item => item.folder === folder);
  
    const [images, setImages] = useState([null, null, null, null]);
    const [error, setError] = useState(null);
  
    // Calculate next and previous titles in render
    const nextIndex = (currentIndex + 1) % location.state.items.length;
    const nextItem = location.state.items[nextIndex];
    const nextTitle = nextItem.title;
    
    const prevIndex = (currentIndex - 1 + location.state.items.length) % location.state.items.length;
    const prevItem = location.state.items[prevIndex];
    const prevTitle = prevItem.title;
    
    const navigateToNextItem = () => {
      navigate(`/about/${nextItem.folder}`, { state: { index: nextIndex, items: location.state.items } });
    };
    
    const navigateToPreviousItem = () => {
      navigate(`/about/${prevItem.folder}`, { state: { index: prevIndex, items: location.state.items } });
    };
  
    useEffect(() => {
      if (item) {
        Promise.all([0, 1, 2, 3].map(num => loadImage(item, num)))
          .then(paths => setImages(paths))
          .catch(error => {
            console.error('Error loading images:', error);
            setError('Failed to load images.');
          });
      }
    }, [item]);
  
    if (!item) {
      return <p>Item not found</p>
    }
  
    if (error) {
      return <p>{error}</p>;
    }

  return (
    <div className="portfolio-item-page">
        <h1>{item.title}</h1>
        
        <p className="main-caption">{item.main_caption}</p>
        
        <div className="links-container">
            {item.links.map((link, index) => (
            <a key={index} href={link[1]} target="_blank" rel="noreferrer">{link[0]}</a>
            ))}
        </div>

        <div className="images-container">
        {images.map((imgPath, num) => imgPath && (
            <div className="image-wrapper" key={num}>
            <img src={imgPath} alt={`Image ${num + 1}`} />
            {item.captions[num] && <p className="caption">{item.captions[num]}</p>}
            </div>
        ))}
        </div>

        <div className="embeddings">
        {item.local_links.map((link, index) => (
            <img key={index} src={require(`../assets/${link}`)} alt={`Local Image ${index + 1}`} />
        ))}
        </div>

        <div className="footer">
            <button className="nav-button footer-button" onClick={navigateToPreviousItem}>
                <span className="button-symbol">&lt;</span>
                {prevTitle && <span className="nav-title">{prevTitle}</span>}
            </button>
            <button className="back-button footer-button" onClick={() => navigate("/")}>Back to Portfolio</button>
            <button className="nav-button footer-button" onClick={navigateToNextItem}>
                {nextTitle && <span className="nav-title">{nextTitle}</span>}
                <span className="button-symbol">&gt;</span>
            </button>
        </div>

    </div>
  );
}

export default PortfolioItemPage;

