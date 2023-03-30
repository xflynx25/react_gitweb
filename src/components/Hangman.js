import React, { useState } from 'react';
import '../stylesheets/Hangman.css';

function Hangman({ word }) {
  const [guesses, setGuesses] = useState(new Set());
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState('');

  // Split the word into an array of letters and spaces
  const wordArray = word.toLowerCase().split('');
  console.log(wordArray)

    // Build a string to display the word with guessed letters
    const displayString = wordArray.reduce((acc, letter) => {
        if (letter === ' ') {
        return acc + ' ';
        } else if (guesses.has(letter)) {
        return acc + letter;
        } else {
        return acc + '_';
        }
    }, '');

  // Check if the player has won (all letters have been guessed)
  const hasWon = wordArray.every((letter) => guesses.has(letter) || letter === ' ');

  // Check if the player has lost (exceeded maximum incorrect guesses)
  const hasLost = incorrectGuesses >= 5;

  // Define the hangman ASCII art
  const hangmanArt = [
    '_______',
    '|      |',
    '|      O',
    ' |     /|\\',
    ' |     / \\',
    '|       ',
  ];

  // Slice the hangman art to show only the relevant body parts
  const visibleHangman = hangmanArt.slice(0, incorrectGuesses + 1).join('\n');


  // Handle a player's guess
  const handleGuess = (event) => {
    // Ignore duplicate guesses
    const letter = event.key.toLowerCase();
    if (guesses.has(letter)) {
      return;
    }

    // Add the guess to the set of guesses
    const newGuesses = new Set(guesses);
    newGuesses.add(letter);
    setGuesses(newGuesses);

    // Increment the number of incorrect guesses if the guess is incorrect
    if (!wordArray.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }

    // Convert the Set of guessed letters to a string
    const guessedLettersString = Array.from(newGuesses).join('');
    setGuessedLetters(guessedLettersString);
  };

  return (
    <div className="hangman-container">
      <div className="hangman-art">{visibleHangman}</div>
      <div className='middle-container'>
        <div className='stack-middle'>
            <div className="prompt-text">Was ist prompt?</div> 
            <div className='guessed-letters'>Guessed letters: {guessedLetters}</div>
            <div className="hangman-word">
                {displayString}
            </div>
        </div>
        <div className='middle-bottom'>
            {!hasWon && !hasLost && (
                <div className="hangman-input-container">
                <input
                    className="hangman-input"
                    type="text"
                    maxLength="1"
                    onKeyDown={(e) => e.key.length === 1 && handleGuess(e)}
                    autoFocus
                />
                </div>
            )}
            {hasWon && <p className='game-over-message win'>You win!</p>}
            {hasLost && <p className='game-over-message loss'>You lose!</p>}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Hangman;