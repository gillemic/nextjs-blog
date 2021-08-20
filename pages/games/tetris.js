import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import TetrisBoard from "../../components/tetris-board"
import React from 'react'

class Tetris extends React.Component {
  constructor(props) {
    super(props)
    // Generate board based on number of boardHeight & boardWidth props
    let field = []

    for (let y = 0; y < 20; y++) {
      let row = []

      for (let x = 0; x < 14; x++) {
        row.push(0)
      }

      field.push(row)
    }

    // Set starting column to center
    let xStart = Math.floor(parseInt(14) / 2)

    // Initialize state with starting conditions
    this.state = {
      activeTileX: xStart,
      activeTileY: 1,
      activeTile: 1,
      tileRotate: 0,
      score: 0,
      level: 1,
      tileCount: 0,
      gameOver: false,
      isPaused: false,
      field: field,
      timerId: null,
      tiles: [
        // 7 tiles
        // Each tile can be rotated 4 times (x/y coordinates)
        [
          // The default square
          [[0, 0], [0, 0], [0, 0], [0, 0]],
          [[0, 0], [0, 0], [0, 0], [0, 0]],
          [[0, 0], [0, 0], [0, 0], [0, 0]],
          [[0, 0], [0, 0], [0, 0], [0, 0]]
        ],
        [
          // The cube tile (block 2x2)
          [[0, 0], [1, 0], [0, 1], [1, 1]],
          [[0, 0], [1, 0], [0, 1], [1, 1]],
          [[0, 0], [1, 0], [0, 1], [1, 1]],
          [[0, 0], [1, 0], [0, 1], [1, 1]]
        ],
        [
          // The I tile
          [[0, -1], [0, 0], [0, 1], [0, 2]],
          [[-1, 0], [0, 0], [1, 0], [2, 0]],
          [[0, -1], [0, 0], [0, 1], [0, 2]],
          [[-1, 0], [0, 0], [1, 0], [2, 0]]
        ],
        [
          // The T tile
          [[0, 0], [-1, 0], [1, 0], [0, -1]],
          [[0, 0], [1, 0], [0, 1], [0, -1]],
          [[0, 0], [-1, 0], [1, 0], [0, 1]],
          [[0, 0], [-1, 0], [0, 1], [0, -1]]
        ],
        [
          // The inverse L tile
          [[0, 0], [-1, 0], [1, 0], [-1, -1]],
          [[0, 0], [0, 1], [0, -1], [1, -1]],
          [[0, 0], [1, 0], [-1, 0], [1, 1]],
          [[0, 0], [0, 1], [0, -1], [-1, 1]]
        ],
        [
          // The L tile
          [[0, 0], [1, 0], [-1, 0], [1, -1]],
          [[0, 0], [0, 1], [0, -1], [1, 1]],
          [[0, 0], [1, 0], [-1, 0], [-1, 1]],
          [[0, 0], [0, 1], [0, -1], [-1, -1]]
        ],
        [
          // The Z tile
          [[0, 0], [1, 0], [0, -1], [-1, -1]],
          [[0, 0], [1, 0], [0, 1], [1, -1]],
          [[0, 0], [1, 0], [0, -1], [-1, -1]],
          [[0, 0], [1, 0], [0, 1], [1, -1]]
        ],
        [
          // The inverse Z tile
          [[0, 0], [-1, 0], [0, -1], [1, -1]],
          [[0, 0], [0, -1], [1, 0], [1, 1]],
          [[0, 0], [-1, 0], [0, -1], [1, -1]],
          [[0, 0], [0, -1], [1, 0], [1, 1]]
        ]
      ]
    }
  }

  /*componentWillMount() {
    //document.addEventListener('keydown', this.handleKeyPress);
  }*/

  handleKeyPress = (event) => {
    event.preventDefault()

    if (event.key === 'ArrowLeft') {
      this.handleBoardUpdate('left');
    }
    if (event.key === 'ArrowRight') {
      this.handleBoardUpdate('right');
    }
    if (event.key === 'ArrowUp') {
      this.handleBoardUpdate('rotate');
    }
    if (event.key === 'ArrowDown') {
      this.handleBoardUpdate('down');
    }
    if (event.key === ' ') {
      this.handlePauseClick();
    }
  };

  /**
   * @description Sets timer after component mounts
   * Uses level (this.state.level) to determine the interval (game speed)
   * and executes handleBoardUpdate() set to 'down' method during each interval
   * @memberof Tetris
   */
   componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    let timerId;

    timerId = window.setInterval(
      () => this.handleBoardUpdate('down'),
      1000 - (this.state.level * 10 > 600 ? 600 : this.state.level * 10)
    )

    this.setState({
      timerId: timerId
    })
  }

  /**
   * @description Resets the timer when component unmounts
   * @memberof Tetris
   */
  componentWillUnmount() {
    window.clearInterval(this.state.timerId)
  }

  /**
   * @description Handles board updates
   * @param {string} command
   * @memberof Tetris
   */
   handleBoardUpdate(command) {
    // Do nothing if game ends, or is paused
    if (this.state.gameOver || this.state.isPaused) {
      return
    }

    // Prepare variables for additions to x/y coordinates, current active tile and new rotation
    let xAdd = 0
    let yAdd = 0
    let rotateAdd = 0
    let tile = this.state.activeTile

    // If tile should move to the left
    // set xAdd to -1
    if (command === 'left') {
      xAdd = -1
    }

    // If tile should move to the right
    // set xAdd to 1
    if (command === 'right') {
      xAdd = 1
    }

    // If tile should be rotated
    // set rotateAdd to 1
    if (command === 'rotate') {
      rotateAdd = 1
    }

    // If tile should fall faster
    // set yAdd to 1
    if (command === 'down') {
      yAdd = 1
    }

    // Get current x/y coordinates, active tile, rotate and all tiles
    let field = this.state.field
    let x = this.state.activeTileX
    let y = this.state.activeTileY
    let rotate = this.state.tileRotate

    const tiles = this.state.tiles

    // Remove actual tile from field to test for new insert position
    field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = 0
    field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = 0
    field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = 0
    field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = 0

    // Test if the move can be executed on actual field
    let xAddIsValid = true

    // Test if tile should move horizontally
    if (xAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can be moved without getting outside the board
        if (
          x + xAdd + tiles[tile][rotate][i][0] >= 0
          && x + xAdd + tiles[tile][rotate][i][0] < 14
        ) {
          if (field[y + tiles[tile][rotate][i][1]][x + xAdd + tiles[tile][rotate][i][0]] !== 0) {
            // Prevent the move
            xAddIsValid = false
          }
        } else {
          // Prevent the move
          xAddIsValid = false
        }
      }
    }

    // If horizontal move is valid update x variable (move the tile)
    if (xAddIsValid) {
      x += xAdd
    }

    // Try to rotate the tile
    let newRotate = rotate + rotateAdd > 3 ? 0 : rotate + rotateAdd
    let rotateIsValid = true

    // Test if tile should rotate
    if (rotateAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can be rotated without getting outside the board
        if (
          x + tiles[tile][newRotate][i][0] >= 0 &&
          x + tiles[tile][newRotate][i][0] < 14 &&
          y + tiles[tile][newRotate][i][1] >= 0 &&
          y + tiles[tile][newRotate][i][1] < 20
        ) {
          // Test of tile rotation is not blocked by other tiles
          if (
            field[y + tiles[tile][newRotate][i][1]][
              x + tiles[tile][newRotate][i][0]
            ] !== 0
          ) {
            // Prevent rotation
            rotateIsValid = false
          }
        } else {
          // Prevent rotation
          rotateIsValid = false
        }
      }
    }

    // If rotation is valid update rotate variable (rotate the tile)
    if (rotateIsValid) {
      rotate = newRotate
    }

    // Try to speed up the fall of the tile
    let yAddIsValid = true

    // Test if tile should fall faster
    if (yAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        // Test if tile can fall faster without getting outside the board
        if (
          y + yAdd + tiles[tile][rotate][i][1] >= 0 &&
          y + yAdd + tiles[tile][rotate][i][1] < 20
        ) {
          // Test if faster fall is not blocked by other tiles
          if (
            field[y + yAdd + tiles[tile][rotate][i][1]][
              x + tiles[tile][rotate][i][0]
            ] !== 0
          ) {
            // Prevent faster fall
            yAddIsValid = false
          }
        } else {
          // Prevent faster fall
          yAddIsValid = false
        }
      }
    }

    // If speeding up the fall is valid (move the tile down faster)
    if (yAddIsValid) {
      y += yAdd
    }

    // Render the tile at new position
    field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = tile
    field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = tile
    field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = tile
    field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = tile

    // If moving down is not possible, remove completed rows add score
    // and find next tile and check if game is over
    if (!yAddIsValid) {
      for (let row = 20 - 1; row >= 0; row--) {
        let isLineComplete = true

        // Check if row is completed
        for (let col = 0; col < 14; col++) {
          if (field[row][col] === 0) {
            isLineComplete = false
          }
        }

        // Remove completed rows
        if (isLineComplete) {
          for (let row = 20 - 1; row > 0; row--) {
            for (let col = 0; col < 14; col++) {
              field[row][col] = field[row - 1][col]
            }
          }

          // Check if the row is the last
          row = 20
        }
      }

      // Update state - update score, update number of tiles, change level
      this.setState(prev => ({
        score: prev.score + 1 * prev.level,
        tileCount: prev.tileCount + 1,
        level: 1 + Math.floor(prev.tileCount / 10)
      }))

      // Prepare new timer
      let timerId

      // Reset the timer
      clearInterval(this.state.timerId)

      // Update new timer
      timerId = setInterval(
        () => this.handleBoardUpdate('down'),
        1000 - (this.state.level * 10 > 600 ? 600 : this.state.level * 10)
      )

      // Use new timer
      this.setState({
        timerId: timerId
      })

      // Create new tile
      tile = Math.floor(Math.random() * 7 + 1)
      x = parseInt(14) / 2
      y = 1
      rotate = 0

      // Test if game is over - test if new tile can't be placed in field
      if (
        field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] !== 0 ||
        field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] !== 0 ||
        field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] !== 0 ||
        field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] !== 0
      ) {
        // Stop the game
        this.setState({
          gameOver: true
        })
      } else {
        // Otherwise, render new tile and continue
        field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = tile
        field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = tile
        field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = tile
        field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = tile
      }
    }

    // Update state - use new field, active x/y coordinates, rotation and activeTile
    this.setState({
      field: field,
      activeTileX: x,
      activeTileY: y,
      tileRotate: rotate,
      activeTile: tile
    })
  }

  /**
   * @description Stops and resumes the game
   * @memberof Tetris
   */
   handlePauseClick = () => {
    this.setState(prev => ({
      isPaused: !prev.isPaused
    }))
  }

  /**
   * @description Resets the game
   * @memberof Tetris
   */
   handleNewGameClick = () => {
    // Create an empty board
    let field = []

    for (let y = 0; y < 20; y++) {
      let row = []

      for (let x = 0; x < 14; x++) {
        row.push(0)
      }

      field.push(row)
    }

    // Set starting column to center
    let xStart = Math.floor(parseInt(14) / 2)

    // Initialize state with starting conditions
    this.setState({
      activeTileX: xStart,
      activeTileY: 1,
      activeTile: 2,
      tileRotate: 0,
      score: 0,
      level: 1,
      tileCount: 0,
      gameOver: false,
      field: field
    })
  }

  render() {
    return(
      <Layout>
        <Head>Welcome</Head>
        <section>
          <h1>Tetris</h1>
          <div className="tetris">
          {/* Tetris board */}
          
          <TetrisBoard
            field={this.state.field}
            gameOver={this.state.gameOver}
            score={this.state.score}
            level={this.state.level}
            rotate={this.state.tileRotate}
          />

          {/* Buttons to control blocks */}
          <div className='tetris__block-controls'>
            <button className="btn" onClick={() => this.handleBoardUpdate('left')}>Left</button>

            <button className="btn" onClick={() => this.handleBoardUpdate('down')}>Down</button>

            <button className="btn" onClick={() => this.handleBoardUpdate('right')}>Right</button>

            <button className="btn" onClick={() => this.handleBoardUpdate('rotate')}>Rotate</button>
          </div>

          {/* Buttons to control game */}
          <div className="tetris__game-controls">
            <button className="btn" onClick={this.handleNewGameClick} >New Game</button>

            <button className="btn" onClick={this.handlePauseClick}>{this.state.isPaused ? 'Resume' : 'Pause'}</button>
          </div>
          <div className="tetris-rules">
            <p>Play tetris using the arrow keys and space bar!</p>
            <p><code>&#8592; and &#8594;</code> = Move the tetris piece left or right</p>
            <p><code>&#8593;</code> = Rotate piece clockwise</p>
            <p><code>&#8595; (hold)</code> = Drop piece faster</p>
            <p><code>Spacebar</code> = Pause game</p>
          </div>
        </div>
        </section>
      </Layout>
    )
  } 
}

export default Tetris