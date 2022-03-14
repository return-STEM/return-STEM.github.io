import Link from "next/link"
import Button from "./Button"

import styles from "../styles/components/card.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock} from "@fortawesome/free-regular-svg-icons"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"

export default function Card(props) {
    return (
        <Link href={"/courses/" + props.data.href}>
            <a className={styles.card}>
                <img src={"img/thumbnails/" + props.data.href + ".svg"} className={styles.card_img} alt=""/>
                <h2 className={styles.card_title}>{props.data.name}</h2>
                <div className={styles.card_bottom}>
                    <div className={styles.card_bottom_half_left}>
                        <h4 className={styles.card_bottom_text}><img src={"img/difficulty/" + props.data.difficulty + ".png"} className={styles.card_bottom_diff} /> &#8202; {props.data.difficulty}</h4>
                    </div>
                    <div className={styles.card_bottom_half_right}>
                        <h4 className={styles.card_bottom_text}><FontAwesomeIcon className={styles.card_bottom_icon} icon={faCalendarAlt} /> {props.data.duration}</h4>
                    </div>
                </div>
                <Button containerStyle={styles.card_bottom_button_cont} buttonStyle={styles.card_bottom_button} disabled={false} href="https://google.com" disabledElem={<>Returning Soon <FontAwesomeIcon icon={faClock}/></>}>Sign Up Now &rarr;</Button>
            </a>  
        </Link>
    )
}