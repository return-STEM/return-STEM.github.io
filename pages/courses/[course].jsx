import Head from 'next/head';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Lesson from '../../components/Lesson';

import styles from '../../styles/pages/course.module.scss'

import { promises as fs } from 'fs'
import path from 'path'

export async function getStaticPaths() {
    const dir = path.join(process.cwd(), 'data/courses.json');
    const courses = JSON.parse(await fs.readFile(dir, 'utf8'));
    const paths = courses.courses.map(obj => {
        return {
            params: {
                course: obj.href,
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const dir = path.join(process.cwd(), 'data/courses.json');
    const courses = JSON.parse(await fs.readFile(dir, 'utf8'));
    const courseData = courses.courses.find(elem => elem.href == params.course);
    return {
        props: { courseData }
    }
}


export default function course({ courseData }) {
    return (
        <div id={styles.page}>
          <Head>
            <title>{courseData.name} | Return STEM;</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Return STEM; offers free Online Programming Courses. Sign up for our Introduction to Python course, Intro to C++ course, and Applications of Python course with more in development." />
            <meta name="keywords" content="Python, Free, Learning, Online, Virtual, Programming, C++, OOP, Computer Science" />
            <link rel="shortcut icon" href="/img/Logo.svg" />
          </Head>
          <Nav></Nav>
          <section className={styles.header} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/img/thumbnails/${courseData.href}.svg")`}}>
              <div className={styles.header_cont}>
                <h1 className={styles.header_title}>{courseData.name}</h1>
                <Button containerStyle={styles.header_button_cont} buttonStyle={styles.header_button} disabled={false} href={""} disabledElem={<></>}>Sign Up Now</Button>
              </div>
          </section>
          <section className={styles.desc}>
            {/*
            <div className={styles.desc_top}>
              <div className={styles.desc_top_left}></div>
              <div></div>
            </div>
            */}
            <div className={styles.desc_cont}>
              <h1 className={styles.desc_title}>{courseData.hook}</h1>
              {courseData.desc.map((obj, index) => {
                return (
                  <p className={styles.desc_text} key={index}>{obj}</p>
                )})
              }
              <h1 className={styles.desc_title}>Prerequisites</h1>
              {courseData.prerequisites.map((obj, index) => {
                return (
                  <p className={styles.desc_text} key={index}>{obj}</p>
                )})
              }
              <p className={styles.desc_text}>Rather than download software, students will use <a className={styles.desc_link} href="https://replit.com/" target="_blank">repl.it</a>, a free online browser IDE. We will show students how to set it up in the course, though directions are available <a className={styles.desc_link} href="https://docs.google.com/presentation/d/e/2PACX-1vRiHYjrehQA8LFc9oQQtVY_tDfUEsA7VUl2-kjnRuLFo5ctdItYJHUodKmylUHR-u96B-4JEgLjWRDX/pub?start=false&loop=false&delayms=60000#slide=id.p1" target="_blank">here</a>.</p>
            </div>
          </section>
          <section className={styles.lessons}>
            {courseData.lessons.map((obj, index) => {
              return (
                <Lesson key={obj.title} data={obj} num={index + 1} course={courseData.href} />
              )})
            }
          </section>
          <Footer></Footer>
        </div>
    )
}