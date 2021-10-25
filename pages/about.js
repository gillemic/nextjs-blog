import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
export default function About(props) {
  return (
    <Layout>
      <Head>Welcome</Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
        <p className={utilStyles.blogText}>
          My name is Michael Gillett and I currently live in the Portland metropolitan area. I graduated high school in 2014 and decided that I wanted
          to learn to develop software as a career, just like my uncle does. I went to Oregon State University and graduated with a Computer Science
          degree in 2019.
          <br /><br />
          I started out writing assignments in Python, arguably the most powerful and beginner-friendly lanugage used in modern development. After about 3 months,
          the curriculum shifted to C++, and then eventually C. This was challenging but gave me perspective on some of the underlying technologies that we may
          take for granted today such as memory allocation, garbage collection, pointer references, etc. 
          <br /><br />
          In 2017, I learned how to use Javascript and Node.js to create a Discord bot for me and my friends' server. This bot is still in use today, with over 30 commands.
          I have since made a few more of these bots for different purposes, such as sports scores and villager information from the game Animal Crossing. The sports bot is written
          in Python, and the other two are written in Javascript.
          <br /><br />
          After I graduated in 2019, I decided that I wanted to learn to use production-level developer tools and learned to use Git, React, Netlify, Docker, and a couple of 
          useful Node.js packages such as Express, Axios, and Lodash. I want to get more involved with Microsoft's C# and .NET platforms, but it's a lot different than what
          I'm used to doing.
          <br /><br />
          Aside from working with software, I love to go on walks or hikes with my girlfriend, play video games with my friends, play my guitar/keyboard, and watch
          bad movies.
        </p>
      </section>
    </Layout>
  )
}