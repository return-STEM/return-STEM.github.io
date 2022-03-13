import Head from "next/head"
import Link from "next/link"
import Nav from "../../components/Nav"
import Calendar from "../../components/Calendar"
import Footer from "../../components/Footer"
import Search from "../../components/Search"

import styles from '../../styles/pages/courses.module.scss'

import { promises as fs } from 'fs'
import path from 'path'

import { useEffect, useState } from "react"
import $ from 'jQuery'

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'data/courses.json');
  const courses = JSON.parse(await fs.readFile(dir, 'utf8'));
  return {
    props: { courses }
  }
}

export default function Courses({ courses }) {
    return (
        <div id={styles.page}>
            <Head>
              <title>Courses | Return STEM;</title>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="description" content="Return STEM; offers free Online Programming Courses. Sign up for our Introduction to Python course, Intro to C++ course, and Applications of Python course with more in development." />
              <meta name="keywords" content="Python, Free, Learning, Online, Virtual, Programming, C++, OOP, Computer Science" />
              <link rel="shortcut icon" href="/img/Logo.svg" />
            </Head>
            <Nav></Nav>
            <section className={styles.header}></section>
            <section className={styles.course}>
              <div className={styles.course_wide}>
                <h1 className={styles.course_header}>Browse our courses</h1>
                <Search courses={courses.courses}/>
              </div>
            </section>
            <Footer></Footer>
        </div>
    )
}