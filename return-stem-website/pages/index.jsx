import Head from 'next/head'
import Nav from '../components/Nav'
import Button from '../components/Button'
import styles from '../styles/pages/home.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock} from '@fortawesome/free-regular-svg-icons'

import { promises as fs } from 'fs'
import path from 'path'

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'data/index.json');
  const data = JSON.parse(await fs.readFile(dir, 'utf8'));
  return {
    props: { data }
  }
}

export default function Home({ data }) {
  return (
    <div id={styles.page}>
      <Head>
        <title>Return STEM;</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Return STEM; offers free Online Programming Courses. Sign up for our introduction to python course, with more in development." />
        <meta name="keywords" content="Python, Free, Learning, Online, Virtual, Programming" />
        <meta property="og:title" content="Return STEM;" />
        <meta property="og:description" content="Return STEM; offers free Online Programming Courses. Sign up for our courses and workshops now!" />
        <meta property="og:image" content="https://returnstem.org/index-og-preview.png" />
        <meta property="og:image:height" content="1200px" />
        <meta property="og:image:width" content="1800px" />
        <title>Return STEM;</title>
        <link rel="shortcut icon" href="/img/Logo.svg" />
      </Head>
      {/* Header */}
      <Nav />
      <div className={styles.header}>
        <div className={styles.header_left}>
          <h1 className={styles.header_left_title_top}>Programming</h1>
          <h2 className={styles.header_left_title_bottom}>Taught <em>Right</em></h2>
          <p className={styles.header_left_text}>Free virtual programming classes for <br />grades 5-12</p>  
          <Button containerStyle={styles.header_left_button_cont} buttonStyle={styles.header_left_button} disabled={false} href={data.header.signup_link} disabledElem={<>Returning Soon <FontAwesomeIcon icon={faClock}/><span className="far fa-clock"></span></>}>Sign Up Now &rarr;</Button>
        </div>
        <div className={styles.header_center}></div>
        <div className={styles.header_right}>
          <img src="/img/header-image.png" className={styles.header_right_graphic} alt="programming STEM graphic" />
        </div>
      </div>
      {/* */}
      <div className={styles.why_us}>
      </div>
    </div>
  )
}
