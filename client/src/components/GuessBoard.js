import GuessBoardRow from './GuessBoardRow';

import '../styles/css/components/GuessBoard.css';


function GuessBoard (props) {


  const getFillerRows = () => {
    if(props.guessArray.length < props.rowCount)
      return Array(props.rowCount - (props.guessArray.length + 1)).fill(null);
    else
      return [];
  }


  return (
    <div className={'GuessBoard'}>
      { props.guessArray.map((guess,i) => (
        <GuessBoardRow
          key={i}
          guess={guess}
          guessScore={props.guessScoreArray[i]}
          colCount={props.colCount}/>
        ))
      }

      { (props.guessArray.length < props.rowCount) &&
        <GuessBoardRow
          guess={props.currentGuess}
          guessScore={Array(props.colCount).fill(-1)}
          colCount={props.colCount}/>
      }

      { getFillerRows().map((elem, i) => (
          <GuessBoardRow
            key={i}
            guess={[]}
            colCount={props.colCount}/>
        ))
      }
    </div>
  )
}


export default GuessBoard;
