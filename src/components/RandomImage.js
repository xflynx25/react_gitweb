import React, { useState, useEffect } from 'react';
import imageData from '../assets/imageprompts.json';
import getHourlyPseudoRandomIdx from './helpers';


function RandomImage({ onPromptUpdate }) {  
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (imageData.images.length > 0) {
      const randomImageidx = getHourlyPseudoRandomIdx(imageData.images.length);
      const randomImage = imageData.images[randomImageidx];
      const randomImageSrc = require(`../assets/img/ai/${randomImage.id}`);
      setImageSrc(randomImageSrc);
      onPromptUpdate(randomImage.prompt); // Pass the prompt back to Home
    }
  }, []);

  return (
    <div className="image-container">
      <div>
        {imageSrc && <img src={imageSrc} alt="Random Image" />}
      </div>
    </div>
  );
}
export default RandomImage;