import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import portfolioItems from '../assets/about.json';
import '../stylesheets/PortfolioItemPage.css';



async function loadImage(item, num) {
  const extensions = ['JPEG', 'png', 'jpg', 'jpeg', 'JPG', 'PNG'];
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
    const [showFullCaption, setShowFullCaption] = useState(false);

  
    // Calculate next and previous titles in render
    const nextIndex = (currentIndex + 1) % location.state.items.length;
    const nextItem = location.state.items[nextIndex];
    const nextTitle = nextItem.title;
    
    const prevIndex = (currentIndex - 1 + location.state.items.length) % location.state.items.length;
    const prevItem = location.state.items[prevIndex];
    const prevTitle = prevItem.title;

    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      setLoading(true);
      
      if (item) {
        Promise.all([0, 1, 2, 3].map(num => loadImage(item, num)))
          .then(paths => {
            setImages(paths);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error loading images:', error);
            setError('Failed to load images.');
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }, [item]);

    if (loading) {
      return <p>Loading...</p>;
    }
    
    if (!item) {
      return <p>Item not found</p>
    }

    if (error) {
      return <p>{error}</p>;
    }
    
    const navigateToNextItem = () => {
      navigate(`/about/${nextItem.folder}`, { state: { index: nextIndex, items: location.state.items } });
    };
    
    const navigateToPreviousItem = () => {
      navigate(`/about/${prevItem.folder}`, { state: { index: prevIndex, items: location.state.items } });
    };

  return (
    <div className="portfolio-item-page">
        <h1>{item.title}</h1>
        
        <div className="main-caption">
            {item.main_caption.slice(0, showFullCaption ? item.main_caption.length : 1).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            {item.main_caption.length > 1 && !showFullCaption}
            {item.main_caption.length > 1 && 
            <button className="show-more-button" onClick={() => setShowFullCaption(!showFullCaption)}>
                {showFullCaption ? 'Show Less' : 'Show More'}
            </button>}
        </div>

        
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
            <object key={index} data={require(`../assets/${link}`)} type="application/pdf" width="100%" height="600px">
              <p>It appears you don't have a PDF plugin for this browser. It's ok ... you can <a href={require(`../assets/${link}`)}>click here to download the PDF file.</a></p>
            </object>
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

