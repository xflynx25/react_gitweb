import React, { useState, useEffect } from 'react';
import quoteData from '../assets/quotes.json';
import getHourlyPseudoRandomIdx from './helpers';

function RandomQuote({ onPromptUpdate }) {  
  const [quote, setQuote] = useState({});

  useEffect(() => {
      if (quoteData.quotes.length > 0) {
          const randomIndex = getHourlyPseudoRandomIdx(quoteData.quotes.length);
          setQuote(quoteData.quotes[randomIndex]);
          onPromptUpdate(quoteData.quotes[randomIndex].prompt); // Add this line to pass the prompt back to Home
      }
  }, []);

  return (
    <div className="quote-container">
        <div className="quote-body" dangerouslySetInnerHTML={{ __html: quote.text }}></div>
        <div className="quote-author">- ChatGPT</div>
    </div>
  );
}

export default RandomQuote;