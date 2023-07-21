import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loadImage(item, name) {
  const extensions = ['JPEG', 'png', 'jpg', 'jpeg', 'JPG'];
  const results = await Promise.allSettled(
    extensions.map(ext => import(`../assets/img/about/${item.folder}/${name}.${ext}`))
  );

  const successfulResult = results.find(result => result.status === 'fulfilled');

  return successfulResult?.value.default;
}

function PortfolioItem({ item, index, filteredItems }) {
  const [imgPath, setImgPath] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadImage(item, 'cover')
      .then(path => setImgPath(path))
      .catch(error => console.error('Error loading image:', error));
  }, [item]);

  return (
    <div 
        className="portfolio-item"
        onClick={() => navigate(`/about/${item.folder}`, { state: { index, items: filteredItems } })}
    >
      <img src={imgPath} alt={item.title} className="portfolio-item-img" />
      <h2 className="portfolio-item-title">{item.title}</h2>
    </div>
  );
}

export default PortfolioItem;
