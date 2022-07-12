import { useEffect, useCallback } from 'react';
import logo from './logo.svg';
import GameInterface from './components/GameInterface';

import './styles/css/App.css';

function App() {


  return (
    <div className="App">
      <h1 className='App__title'>Wordle</h1>
      <GameInterface
        gameOptions={{
          wordLength: 5,
          attemptsAllowed: 6
        }}
      />
      <p className={'api-credits'}>Powered by <span><a target='_' href="https://random-word-api.herokuapp.com">random-word-api.herokuapp.com</a></span></p>
    </div>
  );
}

export default App;
