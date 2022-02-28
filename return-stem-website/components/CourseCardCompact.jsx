import Link from "next/link";
import styles from "../styles/pages/guide.module.sass";

export default  function CompactCourseCard(props) {
    return (
        <Link href={`/guide/${props.courseData.href}`}>
            <div
                className={styles["nav-title"]}
                style={{backgroundImage: `url(../../img/thumbnails/${props.courseData.href}.svg)`}}>

                <h1> {props.courseData.name} </h1>
            </div>
            <div>
                <span>Difficulty: {props.courseData.difficulty}</span>
                <span>{props.courseData.lessons.length} Lessons</span>
            </div>

        </Link>
    )
}