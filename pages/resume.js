import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const pdfStyle = {
  width: "100%",
  height: "100%",
  minHeight: "700px",
  display: "flex",
  margin: "auto"
}

export default function Resume(props) {
  return (
    <Layout>
      <Head>Welcome</Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Resume</h2>
        <iframe style={pdfStyle} title="resume" src="resume.pdf" />
      </section>
    </Layout>
  )
}