import {Bio} from "../../../lib/aboutFetcher";
import styles from "../../../styles/components/VolunteerCard.module.scss"
import {MDXRemote} from "next-mdx-remote";
import {callbackify} from "util";
import {MouseEventHandler} from "react";

const VolunteerCard = (props: { bio: Bio , callback: MouseEventHandler}) => {
    return (
        <div className={styles["card"]} onClick={props.callback}>
            {/*    Default view*/}
            <div className={styles["summary"]}>
                <img src={props.bio.picture} alt={props.bio.picture}/>
                <h1>{props.bio.name}</h1>
                <h2>{props.bio.title}</h2>


            </div>
            {/*    Hover view*/}
            <div className={styles["bio"]}>
                <div className={styles["bio-inner"]}>
                    <h1>{props.bio.name}</h1>

                    <MDXRemote {...props.bio.bio}/>
                </div>
            </div>
        </div>
    )

}
export default VolunteerCard