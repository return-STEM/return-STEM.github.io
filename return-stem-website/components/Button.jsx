import styles from '../styles/components/button.module.scss';

export default function Button(props) {
    return (
        <form className={[styles.container, props.containerStyle].join(" ")} action={props.href} target="_blank">
            <div className={styles.container_anim}>
                <button disabled={props.disabled} className={props.buttonStyle}>
                    <span className={styles.container_anim_default}>
                        {props.children}
                    </span>
                    <span className={styles.container_anim_disabled}>
                        {props.disabledElem}
                    </span>
                </button>
            </div>
        </form>
    )
}