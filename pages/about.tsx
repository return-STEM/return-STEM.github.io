import Head from "next/head";
import Nav from "../components/layout/Nav";
import Footer from "../components/layout/Footer";
import styles from "../styles/pages/about.module.scss";
import modalStyles from "../styles/components/VolunteerModal.module.scss"

import {promises as fs} from "fs";
import path from "path";
import {Bio, getBios} from "../lib/aboutFetcher";
import VolunteerCard from "../components/pages/about/VolunteerCard";
import VolunteerModal from "../components/pages/about/VolunteerModal";
import {Component} from "react";

export async function getStaticProps() {
    let bios = await getBios()

    return {
        props: {bios},
    };
}

type AboutContent = {
    bios: Bio[]
}

class About extends Component<AboutContent> {
    constructor(props) {
        super(props);
        this.state = {currentBio: null};
    }


    openModal(volunteerBio: Bio) {
        document.getElementById("volunteer-modal").style.display = "flex"
        this.setState({currentBio: volunteerBio})
    }

    closeModal() {
        document.getElementById("volunteer-modal").style.display = "none"
    }

    render() {
        let {bios} = this.props;


        return (
            <div id={styles.page}>
                <Head>
                    <title>About | Return STEM;</title>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta
                        name="description"
                        content="Return STEM; offers free Online Programming Courses. Sign up for our Introduction to Python course, Intro to C++ course, and Applications of Python course with more in development."
                    />
                    <meta
                        name="keywords"
                        content="Python, Free, Learning, Online, Virtual, Programming, C++, OOP, Computer Science"
                    />
                    <link rel="shortcut icon" href="/img/Logo.svg"/>
                </Head>
                <Nav></Nav>
                <div id={"volunteer-modal"} className={modalStyles["modal-container"]} onClick={this.closeModal}
                     style={{display: "none"}}>
                    {
                        this.state.currentBio ? <VolunteerModal bio={this.state.currentBio} closeCallback={this.closeModal}/> : <div/>
                    }
                </div>
                <section className={styles.header}></section>
                <section className={styles.about}>
                    <div className={styles["about-wide"]}>
                        <h1 className={styles["about-header"]}>Meet the Team</h1>
                        {
                            bios.map((b) => (
                                <VolunteerCard bio={b} callback={() => this.openModal(b)} key={b.name}/>

                            ))
                        }

                    </div>
                </section>
                <Footer></Footer>
            </div>
        );
    }
}

export default About