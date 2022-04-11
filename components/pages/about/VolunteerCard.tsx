import styles from "../../../styles/components/volCard.module.scss";
import $ from "jQuery";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function VolunteerCard({}) {
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
    }
  });

  useEffect(() => {
    $(function () {
      if (modal) $("." + styles.modal).show();
      else $("." + styles.modal).hide();
      $("." + styles.card).on("click", function () {
        setModal(!modal);
      });
      $("." + styles.modal).on("click", function (e) {
        console.log("aw dang");
        if (e.target === this)
          setModal(false);
      });
    });
    return () => {
      $("." + styles.modal).off("click");
    }
  });

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.card_inner}>
          <div className={styles.card_front}>
            <img src="img/bios/jasonl.png" className={styles.card_front_img} />
            <div className={styles.card_front_bot}>
              <h3>Jason Liu</h3>
              <h4>Head of Course Development</h4>
            </div>
          </div>
          <div className={styles.card_back}>
            <div className={styles.card_back_cont}>
              <h3>Fun Facts!</h3>
              <div className={styles.card_back_cont_fact}>
                <h4>Favorite Food</h4>
                <h5>Dog</h5>
              </div>
              <div className={styles.card_back_cont_fact}>
                <h4>Favorite Music</h4>
                <h5>Trascedental Etudes</h5>
              </div>
              <div className={styles.card_back_cont_fact}>
                <h4>Dream Pet</h4>
                <h5>Ginger Tabby</h5>
              </div>
              <div className={styles.card_back_cont_fact}>
                <h4>Future Job</h4>
                <h5>Homeless</h5>
              </div>
              <div className={styles.card_back_cont_fact}>
                <h4>League Main</h4>
                <h5>Ahri</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modal}>
        <div className={styles.modal_inner}></div>
      </div>
    </div>
  );
}
