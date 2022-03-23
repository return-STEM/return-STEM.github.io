import Head from "next/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import Search from "../../components/pages/courses/Search";

import styles from "../../styles/pages/courses.module.scss";

import { promises as fs } from "fs";
import path from "path";

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "data/courses/courses.json");
  const courses = JSON.parse(await fs.readFile(dir, "utf8"));
  return {
    props: { courses },
  };
}

export default function Courses({ courses }) {
  return (
    <div id={styles.page}>
      <Head>
        <title>Courses | Return STEM;</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Return STEM; offers free Online Programming Courses. Sign up for our Introduction to Python course, Intro to C++ course, and Applications of Python course with more in development."
        />
        <meta
          name="keywords"
          content="Python, Free, Learning, Online, Virtual, Programming, C++, OOP, Computer Science"
        />
        <link rel="shortcut icon" href="/img/Logo.svg" />
      </Head>
      <Nav></Nav>
      <section className={styles.header}></section>
      <section className={styles.course}>
        <div className={styles.course_wide}>
          <h1 className={styles.course_header}>Browse our courses</h1>
          <Search courses={courses} />
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
