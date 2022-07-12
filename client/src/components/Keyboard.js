import { useState, useEffect } from 'react';

import '../styles/css/components/Keyboard.css';

function Keyboard(props) {
  const KEYROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
    .map((row) => row.split(''));
  KEYROWS[KEYROWS.length - 1].unshift('enter');
  KEYROWS[KEYROWS.length - 1].push('backspace');


  const keyClickHandler = (letter) => {
    props.onKeyClick(letter)
  }


  const submitHandler = () => {
    props.onSubmit();
  }


  const backspaceHandler = () => {
    props.onBackspace();
  }


  const getKeyClass = (letter) => {
    if(letter === 'enter' || letter === 'button')
      return 'Keyboard__row__button action'
    else if(props.wrongLetterSet.has(letter))
      return 'Keyboard__row__button used'
    else
      return 'Keyboard__row__button';
  }


  return (
    <div className='Keyboard'>
      {
        KEYROWS.map((row,i) => (
          <div key={'row'+ i} className='Keyboard__row'>
            {
              row.map((letter) => {
                return <a key={letter} className={getKeyClass(letter)} onClick={()=>keyClickHandler(letter)}>{letter}</a>
              })
            }
          </div>
        ))
      }
    </div>
  )
}


export default Keyboard;
