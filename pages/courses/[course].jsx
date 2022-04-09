import Head from "next/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";
import Lesson from "../../components/pages/course/Lesson";

import styles from "../../styles/pages/course.module.scss";

import { promises as fs } from "fs";
import path from "path";

export async function getStaticPaths() {
  const dir = path.join(process.cwd(), "data/courses/courses.json");
  const courses = JSON.parse(await fs.readFile(dir, "utf8"));
  const paths = courses.map((obj) => {
    return {
      params: {
        course: obj.href,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const info = JSON.parse(
    await fs.readFile(
      path.join(process.cwd(), "data/courses/" + params.course + "/info.json"),
      "utf8"
    )
  );
  const lessons = JSON.parse(
    await fs.readFile(
      path.join(
        process.cwd(),
        "data/courses/" + params.course + "/lessons.json"
      ),
      "utf8"
    )
  );
  const href = params.course;
  return {
    props: { info, lessons, href },
  };
}

export default function course({ info, lessons, href }) {
  return (
    <div id={styles.page}>
      <Head>
        <title>{info.name} | Return STEM;</title>
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
      <section
        className={styles.header}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/img/thumbnails/${href}.svg")`,
        }}
      >
        <div className={styles.header_cont}>
          <h1 className={styles.header_title}>{info.name}</h1>
          <Button
            containerStyle={styles.header_button_cont}
            buttonStyle={styles.header_button}
            disabled={info.signup_disabled}
            href={info.signup}
            disabledElem={<></>}
          >
            Sign Up Now
          </Button>
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
          <h1 className={styles.desc_title}>{info.hook}</h1>
          {info.desc.map((obj, index) => {
            return (
              <p className={styles.desc_text} key={index}>
                {obj}
              </p>
            );
          })}
          <h1 className={styles.desc_title}>Prerequisites</h1>
          {info.prerequisites.map((obj, index) => {
            return (
              <p className={styles.desc_text} key={index}>
                {obj}
              </p>
            );
          })}
          <p className={styles.desc_text}>
            Rather than download software, students will use{" "}
            <a
              className={styles.desc_link}
              href="https://replit.com/"
              target="_blank"
              rel="noreferrer"
            >
              repl.it
            </a>
            , a free online browser IDE. We will show students how to set it up
            in the course, though directions are available{" "}
            <a
              className={styles.desc_link}
              href="https://docs.google.com/presentation/d/e/2PACX-1vRiHYjrehQA8LFc9oQQtVY_tDfUEsA7VUl2-kjnRuLFo5ctdItYJHUodKmylUHR-u96B-4JEgLjWRDX/pub?start=false&loop=false&delayms=60000#slide=id.p1"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
      </section>
      <section className={styles.lessons}>
        {lessons.map((obj, index) => {
          return (
            <Lesson key={obj.title} data={obj} num={index + 1} course={href} />
          );
        })}
      </section>
      <Footer></Footer>
    </div>
  );
}
