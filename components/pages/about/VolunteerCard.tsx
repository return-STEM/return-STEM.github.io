import styles from "../../../styles/components/volCard.module.scss";
import $ from "jQuery";
import { useEffect, useState } from "react";

import { Bio } from "../../../pages/about";

import { promises as fs } from "fs";
import path from "path";
/*
export async function getStaticProps() {
  console.log("AHAHAHHAHAA");
  let cats: string[] = ["lol", "xd", "omegalul"];

  for (let i: number = 1; ; i++) {
    try {
      await fs.access(
        path.join(process.cwd(), `public/img/bios/default/cat${i}`)
      );
      cats.push(`cat${i}`);
      console.log(i);
    } catch (e) {
      console.log(e);
      break;
    }
  }
  
  return {
    props: { cats },
  };
}
*/

export default function VolunteerCard({ data, pos }: { data: Bio, pos: number}) {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    $(function () {
      var t: NodeJS.Timeout[] = [];
      $("." + styles.card).on("mouseenter", function () {
        t.forEach((e) => {
          clearTimeout(e);
        });
        t = [];
        $(this)
          .find("." + styles.card_back_cont_fact)
          .css("background-position", "100%")
          .removeClass(styles.slide_anim);
        $(this)
          .find("." + styles.card_back_cont_fact)
          .each(function (index) {
            var that = this;
            setTimeout(function () {
              $(that)
                .css("background-position", "0%")
                .addClass(styles.slide_anim);
            }, 50 * index);
          });
      });
      $("." + styles.card).on("mouseleave", function () {
        var that = this;
        let v = setTimeout(function () {
          $(that)
            .find("." + styles.card_back_cont_fact)
            .removeClass(styles.slide_anim);
        }, 700);
        t.push(v);
      });
    });
    return () => {
      $("." + styles.card).off("mouseenter");
      $("." + styles.card).off("mouseleave");
    };
  });

  useEffect(() => {
    $(function () {
      if (modal) $("." + styles.modal + `[data-pos='${pos}']`).show();
      else $("." + styles.modal + `[data-pos='${pos}']`).hide();
      $("." + styles.card + `[data-pos='${pos}']`).on("click", function () {
        $("html").css("overflow", "hidden");
        setModal(true);
      });
      $("." + styles.modal + `[data-pos='${pos}']`).on("click", function (e) {
        if (e.target === this) {
          $("html").css("overflow", "visible");
          setModal(false);
        }
      });
      $("." + styles.modal_x + `[data-pos='${pos}']`).on("click", function () {
        $("html").css("overflow", "visible");
        setModal(false);
      });
    });
    return () => {
      $("." + styles.modal + `[data-pos='${pos}']`).off("click");
      $("." + styles.card + `[data-pos='${pos}']`).off("click");
      $("." + styles.modal_x + `[data-pos='${pos}']`).off("click");
    };
  });

  return (
    <div>
      <div className={styles.card} data-pos={pos}>
        <div className={styles.card_inner}>
          <div className={styles.card_front}>
            <img
              src={`${data.cardImg}`}
              className={styles.card_front_img}
            />
            <div className={styles.card_front_bot}>
              <h3>{data.name}</h3>
              <h4>{data.position}</h4>
            </div>
          </div>
          <div className={styles.card_back}>
            <div className={styles.card_back_cont}>
              <h3>Fun Facts!</h3>
              {data.facts.map((fact, index) => {
                return (
                  <div className={styles.card_back_cont_fact} key={index}>
                    <h4>{fact[0]}</h4>
                    <h5>{fact[1]}</h5>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modal} data-pos={pos}>
        <div className={styles.modal_inner}>
          <div className={styles.modal_x} data-pos={pos}>
            <span className={styles.modal_x_1}></span>
            <span className={styles.modal_x_2}></span>
          </div>
          <div
            className={styles.modal_img}
            style={{ backgroundImage: `url(${data.modalImg})` }}
          />
          <div className={styles.modal_right}>
            <h3>{data.name}</h3>
            {data.description.map((par, index) => {
              return <p key={index}>{par}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
