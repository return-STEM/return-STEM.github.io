import Head from 'next/head'
import Nav from '../components/layout/Nav'
import Button from '../components/common/Button'
import Footer from '../components/layout/Footer'
import styles from '../styles/pages/home.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock} from '@fortawesome/free-regular-svg-icons'

import { promises as fs } from 'fs'
import path from 'path'

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'data/pages/home.json');
  const data = JSON.parse(await fs.readFile(dir, 'utf8'));
  return {
    props: { data }
  }
}

export default function Home({ data }) {
  return (
    <div id={styles.page}>
      <Head>
        <title>Home | Return STEM;</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Return STEM; offers free Online Programming Courses. Sign up for our Introduction to Python course, Intro to C++ course, and Applications of Python course with more in development." />
        <meta name="keywords" content="Python, Free, Learning, Online, Virtual, Programming, C++, OOP, Computer Science" />
        <meta property="og:title" content="Return STEM;" />
        <meta property="og:description" content="Return STEM; offers free Online Programming Courses. Sign up for our courses and workshops now!" />
        <meta property="og:image" content="https://returnstem.org/index-og-preview.png" />
        <meta property="og:image:height" content="1200px" />
        <meta property="og:image:width" content="1800px" />
        <link rel="shortcut icon" href="/img/common/Logo.svg" />
      </Head>
      {/* Header */}
      <Nav />
      <header className={styles.header}>
        <div className={styles.header_left}>
          <h1 className={styles.header_left_title_top}>Programming</h1>
          <h2 className={styles.header_left_title_bottom}>Taught <em>Right</em></h2>
          <p className={styles.header_left_text}>Free virtual programming classes for <br />grades 5-12</p>  
          <Button containerStyle={styles.header_left_button_cont} buttonStyle={styles.header_left_button} disabled={data.header.signup_disabled} href={data.header.signup_link} disabledElem={<>Returning Soon <FontAwesomeIcon icon={faClock}/></>}>Sign Up Now &rarr;</Button>
        </div>
        <div className={styles.header_center}></div>
        <div className={styles.header_right}>
          <img src="/img/pages/home/header-image.png" className={styles.header_right_graphic} alt="programming STEM graphic" />
        </div>
      </header>
      {/* About */}
      <section className={styles.about} id="about">
        <div className={styles.about_why_1}>
          <h1 className={styles.about_title}>Why Us?</h1>
          <p className={styles.about_text}>The Return STEM; team is made up of high school students from with many accomplishments in the field of programming and computer science. We’ve made original material specifically designed for our unique courses, and our mentors are dedicated to helping students learn programming. </p>
        </div>
        <div className={styles.about_why_2}>
          <div className={styles.about_why_2_left}>
            <h1 className={styles.about_title}>Quality Course Materials</h1>
            <p className={styles.about_text}>Our courses are all carefully created by our mentors. They include essential information, tips, programming examples, and common questions along with their answers.</p>
          </div>
          <div className={styles.about_why_2_right}>
            <img src="/img/pages/home/slideCollageOne.png" alt="" className={[styles.about_why_2_img, styles.about_why_2_img_1].join(' ')} />
            <img src="/img/pages/home/slideCollageTwo.png" alt="" className={[styles.about_why_2_img, styles.about_why_2_img_2].join(' ')} />
            <img src="/img/pages/home/slideCollageThree.png" alt="" className={[styles.about_why_2_img, styles.about_why_2_img_3].join(' ')} />
          </div>
        </div>
        <div className={styles.about_why_3}>
          <h1 className={styles.about_title}>Free, Free, and Free</h1>
          <p className={styles.about_text}>Return STEM; is committed to making programming accessible to all people, no matter their background. All of our courses are 100% free and all material for every course is available in their corresponding description.</p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
