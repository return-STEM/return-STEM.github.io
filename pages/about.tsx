import Head from "next/head";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import styles from "../styles/pages/about.module.scss";
import VolunteerCard from "../components/pages/about/VolunteerCard";

import { promises as fs } from "fs";
import path from "path";

export default function About() {
  return (
    <div id={styles.page}>
      <Head>
        <title>About | Return STEM;</title>
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
        <link rel="shortcut icon" href="/img/common/Logo.svg" />
      </Head>
      <Nav></Nav>
      <section className={styles.header}></section>
      <section className={styles.about}>
        <div className={styles.about_wide}>
          <h1 className={styles.about_header}>Meet our Team</h1>
          <VolunteerCard></VolunteerCard>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
