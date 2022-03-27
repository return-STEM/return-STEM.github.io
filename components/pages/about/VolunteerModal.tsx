import {inspect} from "util";
import styles from "../../../styles/components/VolunteerModal.module.scss"
import BlurImage from "../../common/BlurImage";
import {Bio} from "../../../lib/aboutFetcher";
import {MDXRemote} from "next-mdx-remote";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClose
} from "@fortawesome/free-solid-svg-icons"


const VolunteerModal = (props: { bio: Bio, closeCallback: Function }) => {

    return (
        <div className={styles["modal-outer"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["modal"]}>
                <div className={styles["modal-image"]}>
                    <BlurImage src={props.bio.picture}/>
                </div>
                <div className={styles["modal-info"]}>

                    <h1>{props.bio.name}</h1>
                    <h2>{props.bio.title}</h2>


                    <div className={styles["bio-desc"]}>
                        <MDXRemote {...props.bio.bio}/>
                    </div>


                </div>
                <div className={styles["modal-close"]}>

                    <FontAwesomeIcon icon={faClose}/>
                </div>

            </div>
        </div>
    )
}
export default VolunteerModal