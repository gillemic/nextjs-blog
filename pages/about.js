import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function About(props) {
  return (
    <Layout>
      <Head>Welcome</Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
        <p>
          Ut cursus nisi feugiat, sollicitudin ante at, aliquet dolor. Nulla blandit ligula tempor ex feugiat vestibulum. Nulla facilisi. Vivamus sit amet hendrerit magna. Proin lacus nibh, varius a semper non, rhoncus eu enim. Mauris consequat rhoncus urna quis imperdiet. In maximus malesuada nibh non porta. In et nunc feugiat, ornare odio at, facilisis est. Sed convallis nisl eget velit placerat, at dictum felis lobortis. Aenean ante enim, sodales nec ultricies ut, mattis eget ipsum. Praesent luctus urna non nisl maximus, molestie scelerisque ante dapibus. Integer aliquam lacus et vulputate scelerisque.
          <br /><br />
          Nulla in dignissim metus. Nunc massa ex, lacinia eget vestibulum porttitor, consectetur sit amet sem. Proin eleifend velit dolor, vitae tristique erat semper sit amet. Nullam nec massa convallis lectus porttitor semper vitae quis arcu. Pellentesque imperdiet, elit eu placerat accumsan, metus magna egestas risus, nec condimentum justo nunc varius augue. In varius lectus sed sollicitudin hendrerit. Morbi lacinia tortor sit amet cursus feugiat. Pellentesque vitae purus nec urna pellentesque lacinia. Fusce sollicitudin, nibh placerat tristique vestibulum, nisi ligula eleifend est, ac placerat turpis sem eu ligula. Nam sit amet hendrerit purus. Cras ultricies quam ut eros commodo, vel suscipit metus posuere. Maecenas tempus lacinia orci, quis tincidunt ipsum pharetra et. Aliquam lobortis lobortis rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent a aliquet lorem. Nulla lorem orci, tincidunt eget tellus id, egestas malesuada mauris.

        </p>
      </section>
    </Layout>
  )
}