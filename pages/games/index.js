import Head from 'next/head'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'

export default function Games(props) {
  return (
    <Layout>
      <Head>Welcome</Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Games List</h2>
        <ul className={utilStyles.gamesList}>
          <li><Link href="games/tetris"><a>Tetris</a></Link></li>
          <li><Link href="#"><a>Tic Tac Toe - Coming Soon</a></Link></li>
          <li><Link href="#"><a>Connect Four - Coming Soon</a></Link></li>
        </ul>
      </section>
    </Layout>
  )
}