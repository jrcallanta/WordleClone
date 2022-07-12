

function GuessBoardRow(props) {


  const getLetterClass = (index) => {
    return (index < props.guessScore.length && props.guessScore[index] < 0)
      ? 'GuessBoard__letter'
      : 'GuessBoard__letter score score-' + props.guessScore[index];
  }


  const getFillerArray = () => {
    if(props.colCount - props.guess?.length < 0)
      return []
    else
      return Array(props.colCount - props.guess?.length).fill(null)
  }


  return (
    <div className={'GuessBoard__row'}>
      { props.guess?.map((letter, i) => (
          <div key={i} className={`${getLetterClass(i)}`}>{letter}</div>
        ))
      }

      { getFillerArray().map((spacer, i) => (
          <div key={i} className={'GuessBoard__letter'}>{spacer}</div>
        ))
      }
    </div>
  )
}

export default GuessBoardRow;
