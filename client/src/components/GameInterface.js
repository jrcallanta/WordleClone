import { useState, useEffect } from 'react';
import GuessBoard from './GuessBoard';
import Keyboard from './Keyboard';

import '../styles/css/components/GameInterface.css';


const WORD_BANK = {
  5: ['water', 'earth', 'plant', 'snake', 'devil', 'child', 'money', 'happy'],
  6: ['bubble', 'monkey', 'spider', 'pillow', 'screen', 'button', 'maiden', 'carpet']
}


const API_CALL = async (wordLength) => {
  // const wordList = WORD_BANK[wordLength];
  // const word = wordList[Math.floor(Math.random() * wordList.length)];


  try {
    const [word] = await fetch(`https://random-word-api.herokuapp.com/word?number=1&length=${wordLength}`)
      .then(res => res.json());
    return word;

  } catch (err) {

  }

  const wordList = WORD_BANK[wordLength];
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  return word;

}


function GameInterface(props) {
  let gameOptions = (!props.gameOptions)
    ? { wordLength: 5, attemptsAllowed: 6 }
    : props.gameOptions


  const [goalWord, setGoalWord] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [guessArray, setGuessArray] = useState([]);
  const [guessScoreArray, setGuessScoreArray] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);;
  const [attemptCount, setAttemptCount] = useState(0);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [wrongLetterSet, setWrongLetterSet] = useState(new Set());


  useEffect(() => {
    gameStart()
  }, [])


  useEffect(() => {
    if(submitFlag) {
      submitGuess()
      setSubmitFlag(false);
    }
  }, [submitFlag])


  useEffect(() => {
    if(attemptCount >= gameOptions.attemptsAllowed)
      setGameOver(true);
  }, [attemptCount])


  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyClick(event.key)
    }

    if(!gameOver)
      document.addEventListener("keydown", handleKeyDown);
    else
      document.removeEventListener("keydown", handleKeyDown);

    return () => { document.removeEventListener("keydown", handleKeyDown); }
  }, [gameOver])


  const gameStart = async () => {
    const newWord = await API_CALL(gameOptions.wordLength);
    setGoalWord(newWord);
    setGameOver(false);
  }


  const gameReset = () => {
    setGuessArray([]);
    setGuessScoreArray([]);
    setCurrentGuess([]);
    setSubmitFlag(false);
    setWrongLetterSet(new Set());
  }


  const handleKeyClick = (key) => {
    if(!gameOver){
      if(key.key) key = key.key;

      key = key.toLowerCase()

      if(key === 'enter')
        setSubmitFlag(true);
      else if (key === 'backspace')
        removeLetter();
      else if(key.match(/^[a-z]{1}$/))
        addLetter(key)
    }
  }


  const submitGuess = () => {
    if(!gameOver && currentGuess.length === gameOptions.wordLength){
      const submittedGuess = currentGuess.join('');

      let wrongLetters = new Set();
      let totalScore = 0;
      const guessScore = Array(gameOptions.wordLength).fill(0);

      for(let i = 0; i < gameOptions.wordLength; i++ ){
        if(goalWord.includes(submittedGuess[i])){
          guessScore[i]++;
          if(goalWord[i] === submittedGuess[i])
            guessScore[i]++;

          totalScore += guessScore[i];
        }

        else {
          wrongLetters.add(submittedGuess[i]);
        }
      }

      if(totalScore >= 2 * goalWord.length)
        setGameOver(true);

      setGuessArray(prev => {
        const newGuessArray = [...prev];
        newGuessArray.push(currentGuess);
        return newGuessArray;
      })

      setGuessScoreArray(prev => {
        const newGuessScoreArray = [...prev];
        newGuessScoreArray.push(guessScore);
        return newGuessScoreArray;
      })

      setAttemptCount(prev => (prev+1));

      setCurrentGuess([])

      setWrongLetterSet(prev => {
        const newSet = new Set([...prev, ...wrongLetters])
        return newSet;
      })

    }
  }


  const removeLetter = () => {
    setCurrentGuess(prev => {
      if(prev.length > 0) {
        const newGuess = [...prev];
        newGuess.pop();
        return newGuess;
      }
      return prev;
    })
  }


  const addLetter = (letter) => {
    setCurrentGuess(prev => {
      if(prev.length < gameOptions.wordLength) {
        const newGuess = [...prev];
        newGuess.push(letter.toLowerCase());
        return newGuess;
      }
      return prev;
    })
  }


  return (
    <div className={"GameInterface"}>
      <div className={'GameInterface__gameOverLabel'}>
        { gameOver &&
          <h2 className={'GameInterface__gameOverLabel__word'}>{goalWord}</h2>
        }
      </div>

      <div className={'GameInterface__guessBoard'}>
        <GuessBoard
          guessArray={guessArray}
          guessScoreArray={guessScoreArray}
          currentGuess={currentGuess}
          rowCount={gameOptions.attemptsAllowed}
          colCount={gameOptions.wordLength}
        />
      </div>

      <div className={'GameInterface__keyboard'}>
        <Keyboard
          onKeyClick={handleKeyClick}
          wrongLetterSet={wrongLetterSet}
        />
      </div>
    </div>
  )
}


export default GameInterface;
