import styles from "../../styles/components/BlurImage.module.sass";


const BlurImage: (props: { src: string, maxHeight?: string }) => JSX.Element = (props) => {
    return (
        <div className={styles["gallery-image"]}
             style={
                 props.maxHeight ? {
                         maxHeight: props.maxHeight,
                         aspectRatio: "unset",
                         backgroundImage: `url(${props.src})`
                     } :
                     {backgroundImage: `url(${props.src})`}}>

            <div className={styles["blur"]} >
                <img src={props.src} alt={props.src}/>
            </div>
        </div>
    )
}
export default BlurImage
