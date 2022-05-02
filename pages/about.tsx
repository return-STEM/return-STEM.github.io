import Head from "next/head";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import styles from "../styles/pages/about.module.scss";
import VolunteerCard from "../components/pages/about/VolunteerCard";

import { promises as fs } from "fs";
import path from "path";

export type Bio = {
  name: string;
  position: string;
  cardImg: string;
  facts: [
    [string, string],
    [string, string],
    [string, string],
    [string, string],
    [string, string]
  ];
  modalImg: string;
  description: string[];
};

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "data/bios/bios.json");
  const bios: Bio[] = JSON.parse(await fs.readFile(dir, "utf8"));

  let cats: string[] = [];
  for (let i: number = 1; ; i++) {
    try {
      await fs.access(
        path.join(process.cwd(), `public/img/bios/default/cat${i}.jpg`)
      );
      cats.push(`cat${i}.jpg`);
    } catch (e) {
      break;
    }
  }
  return {
    props: { bios: bios, cats: cats }
  };
}

export default function About({ bios, cats }) {
  const getCat = (): string => {
    return "/img/bios/default/" + cats.shift();
  }
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
        <h1 className={styles.about_header}>Meet our Team</h1>
        <div className={styles.about_wide}>
          {bios.map((elem: Bio, index) => {
            if (elem.cardImg === "" || elem.modalImg === "") {
              let c: string = getCat();
              elem.cardImg = c;
              elem.modalImg = c;
            }
            return (
              <VolunteerCard
                data={elem}
                key={index}
                pos={index + 1}
              ></VolunteerCard>
            );
          })}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
