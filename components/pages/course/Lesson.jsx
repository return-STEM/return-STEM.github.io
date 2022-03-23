import Button from "../../common/Button";

import styles from "../../../styles/components/lesson.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faBook,
  faPrint,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import $ from "jQuery";

export default function Lesson({ data, num, course }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    $(function () {
      var exp = "." + styles.lesson_exp + "[data-key='" + num + "']";
      $(exp).off("click");
      $(exp)
        .siblings("." + styles.lesson_wide)
        .children("." + styles.lesson_title)
        .off("click");
      if (active) {
        $(exp)
          .siblings("." + styles.lesson_wide)
          .children("." + styles.lesson_drop)
          .slideDown(300);
        $(exp).css("transform", "rotate(90deg)");
        $(exp)
          .children("." + styles.lesson_exp_one)
          .css("opacity", "0");
      } else {
        $(exp)
          .siblings("." + styles.lesson_wide)
          .children("." + styles.lesson_drop)
          .slideUp(300);
        $(exp).css("transform", "none");
        $(exp)
          .children("." + styles.lesson_exp_one)
          .css("opacity", "1");
      }
      $(exp).on("click", function () {
        setActive(!active);
      });
      $(exp)
        .siblings("." + styles.lesson_wide)
        .children("." + styles.lesson_title)
        .on("click", function () {
          setActive(!active);
        });
    });
  });

  return (
    <div className={styles.lesson}>
      <div className={styles.lesson_circ}>
        <p>{num}</p>
      </div>
      <div className={styles.lesson_exp} data-key={num}>
        <span
          className={styles.lesson_exp_one + " " + styles.lesson_exp_bar}
        ></span>
        <span
          className={styles.lesson_exp_two + " " + styles.lesson_exp_bar}
        ></span>
      </div>
      <div className={styles.lesson_wide}>
        <h1 className={styles.lesson_title}>
          {"Lesson " + num + ": " + data.title}
        </h1>
        <h2 className={styles.lesson_short}>{data.short}</h2>
        <div className={styles.lesson_drop}>
          <p className={styles.lesson_drop_text}>{data.description}</p>
          <h2 className={styles.lesson_drop_date}>Next session: {data.date}</h2>
          <div className={styles.lesson_drop_dir}>
            <Button
              containerStyle={styles.lesson_drop_dir_btn_cont}
              buttonStyle={styles.lesson_drop_dir_btn}
              disabled={data.unavailable[0]}
              disabledElem={
                <>
                  Coming Soon &ensp;
                  <FontAwesomeIcon icon={faCode} />
                </>
              }
              href={
                "https://guide.returnstem.org/" +
                course +
                "/" +
                data.href +
                "/slides"
              }
            >
              Presentation &ensp;
              <FontAwesomeIcon icon={faChalkboard} />
            </Button>
            <Button
              containerStyle={styles.lesson_drop_dir_btn_cont}
              buttonStyle={styles.lesson_drop_dir_btn}
              disabled={data.unavailable[1]}
              disabledElem={
                <>
                  Coming Soon &ensp;
                  <FontAwesomeIcon icon={faCode} />
                </>
              }
              href={"https://guide.returnstem.org/" + course + "/" + data.href}
            >
              Walkthrough &ensp;
              <FontAwesomeIcon icon={faBook} />
            </Button>
            <Button
              containerStyle={styles.lesson_drop_dir_btn_cont}
              buttonStyle={styles.lesson_drop_dir_btn}
              disabled={data.unavailable[2]}
              disabledElem={
                <>
                  Coming Soon &ensp;
                  <FontAwesomeIcon icon={faCode} />
                </>
              }
              href={
                "https://guide.returnstem.org/" +
                course +
                "/" +
                data.href +
                "/handout"
              }
            >
              Handout &ensp;
              <FontAwesomeIcon icon={faPrint} />
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.lesson_div}></div>
    </div>
  );
}
