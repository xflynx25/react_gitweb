import React, { useState, useEffect } from 'react';
import '../stylesheets/Home.css';
import RandomImage from '../components/RandomImage';
import RandomQuote from '../components/RandomQuote';
import Hangman from '../components/Hangman';


function Home () {
  const [promptImage, setPromptImage] = useState("");
  const [promptQuote, setPromptQuote] = useState("");

  const handlePromptImageUpdate = (prompt) => {
      setPromptImage(prompt);
  };

  const handlePromptQuoteUpdate = (prompt) => {
      setPromptQuote(prompt);
  };

  /* prevent from jumping to middle of page on initialization (probably due to form) */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, []);


  return (
      <div className="homepage">
          <div className='title-container'>
              <h1 className='title'>Guess the Prompt</h1>
          </div>
          <div className='randomimageai'>
              <RandomImage onPromptUpdate={handlePromptImageUpdate}/>
          </div>
          <div className='hangman-parent-container'>
              <Hangman word={promptImage || "prompt not found"}/>
          </div>
          <div className="quote-wrapper">
              <RandomQuote onPromptUpdate={handlePromptQuoteUpdate}/>
          </div>
          <div className='hangman-parent-container'>
              <Hangman word={promptQuote || "prompt not found"}/>
          </div>
          <p className='endmessage'>check back each hour for a new challenge</p>
      </div>
  )
}

export default Home;