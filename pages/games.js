import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Games(props) {
  return (
    <Layout>
      <Head>Welcome</Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Games List</h2>
        <ul className={utilStyles.gamesList}>
          <li><Link href=""><a>Tetris</a></Link></li>
          <li><Link href=""><a>Tic Tac Toe</a></Link></li>
          <li><Link href=""><a>TBD</a></Link></li>
          <li><Link href=""><a>TBD</a></Link></li>
        </ul>
      </section>
    </Layout>
  )
}