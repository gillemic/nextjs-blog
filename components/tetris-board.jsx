const TetrisBoard = (props) => {
  let rows = []
  
  props.field.forEach((row, index) => {
    //create cols
    const cols = row.map((column, index) => <div className={`col-${column}`} key={index} />)

    rows.push(<div className="tetris-board__row" key={index}>{cols}</div>)
  })

  return (
    <div className="tetris-board">
      {/* Game info */}
      <div className="tetris-board__info">
        <p className ="tetris-board__text">Level: {props.level}</p>

        <p className="tetris-board__text">Score: {props.score}</p>

        {props.gameOver && <p className="tetris-board__text"><strong>Game Over</strong></p>}
      </div>
      
      <div className="tetris-board__board">{rows}</div>
    </div>
  )
}

export default TetrisBoard;