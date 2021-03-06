import Link from 'next/link';

import styles from '../../styles/layout/nav.module.scss';
import { useEffect } from 'react';
import $ from 'jQuery';

export default function Nav() {

    useEffect(() => {
        /*
        document.getElementsByClassName(styles.nav_right_small)[0].addEventListener("click", (event) => {
            setTimeout(function() {
                if (document.getElementById(styles.nav_right_button).matches(":checked")) {
                    console.log("Sanity");
                    document.querySelector("html").classList.add("overflow-hidden");
                } else {
                    document.querySelector("html").classList.remove("overflow-hidden");
                }
            }, 50);
        });
        */
        $(function() {
            $("." + styles.nav_right_small).on("click", function() {
                setTimeout(function() {
                    if ($("#" + styles.nav_right_button).is(":checked")) {
                        $("html").addClass(styles.overflow_hidden);
                    } else {
                        $("html").removeClass(styles.overflow_hidden);
                    }
                }, 50);
            });

            $("." + styles.nav_right_secondary_link).on("click", function() {
                $("#" + styles.nav_right_button).prop("checked", false);
                $("html").removeClass(styles.overflow_hidden);
            });
        });
    });

    return (
        <nav className={styles.nav}>
            <div className={styles.nav_left}>
                <img src="/img/common/Logo.svg" className={styles.nav_left_logo} alt="logo"/>
                <h1 className={styles.nav_left_text}>Return STEM;</h1>
            </div>
            <div className={styles.nav_center}></div>
            <div className={styles.nav_right}>
                <input type="checkbox" id={styles.nav_right_button} />
                <label htmlFor={styles.nav_right_button} className={styles.nav_right_small}>
                    <span id={styles.nav_line_one}></span>
                    <span id={styles.nav_line_two}></span>
                    <span id={styles.nav_line_three}></span>
                    <div className={styles.nav_right_background}>
                    </div>
                </label>
                <div className={styles.nav_right_secondary}>
                    <Link href="/">
                        <a href="" className={styles.nav_right_secondary_link}>Home</a>
                    </Link>
                    <Link href="/#about">
                        <a href="" className={styles.nav_right_secondary_link}>About</a>
                    </Link>
                    <Link href="/courses">
                        <a href="" className={styles.nav_right_secondary_link}>Courses</a>
                    </Link>
                    <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=contact.returnstem@gmail.com" className={styles.nav_right_secondary_link} target="_blank" rel="noreferrer">Contact</a>
                </div>
                <div className={styles.nav_right_link}>
                    <Link href="/">
                        <a href="">Home</a>
                    </Link>
                </div>
                <div className={styles.nav_right_link}>
                    <Link href="/#about">
                        <a href="">About</a>
                    </Link>
                </div>
                <div className={styles.nav_right_link}>
                    <Link href="/courses">
                        <a href="">Courses</a>
                    </Link>
                </div>
                <div className={styles.nav_right_link}>
                    <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=contact.returnstem@gmail.com" target="_blank" rel="noreferrer">Contact</a>
                </div>
            </div>
        </nav>
    )
}