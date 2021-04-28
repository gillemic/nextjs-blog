import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import React from 'react'

class TicTacToe extends React.Component {
  constructor(props) {
    super(props)

    let field = []
  
    for (let y = 0; y < 20; y++) {
      let row = []

      for (let x = 0; x < 14; x++) {
        row.push(0)
      }

      field.push(row)
    } 

    this.state = {
      field: field,
      gameOver: false,
      pieces: ["x", "o"]
    }
  }



  render() {
    return(
      <Layout>
        <Head>
          <title>Tic Tac Toe</title>
        </Head>
        <section>
        <h1>Tic Tac Toe</h1>
          <div className="tictactoe">
            <p>Board</p>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TicTacToe