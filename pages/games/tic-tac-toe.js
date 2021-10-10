import Head from 'next/head'
import Layout from '../../components/layout'
import tttStyles from '../../styles/tictactoe.module.css'
import React from 'react'

function Square(props) {
  const squareStyle = props.value === 'X' ? tttStyles.square1 : tttStyles.square2;
  return (
    <button className={squareStyle} onClick={props.onClick}>
      {props.value ?? ' '}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
    this.resetBoard = this.resetBoard.bind(this);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  resetBoard() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  }

  render() {
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else if (this.state.squares.every( e => e )) {
      status = 'Tie!';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
    }
    
    return (
      <div className={tttStyles.board}>
        <div className={tttStyles.status}>{status}</div>
        <div className={tttStyles.board_row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={tttStyles.board_row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={tttStyles.board_row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className={tttStyles.reset} onClick={this.resetBoard}>Reset</button>
      </div>
    );
  }
}

class TicTacToe extends React.Component {
  render() {
    return (
      <Layout>
        <Head>Tic Tac Toe</Head>
        <div className={tttStyles.game}>
          <div className={tttStyles.game_board}>
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TicTacToe