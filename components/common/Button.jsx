import { useEffect } from 'react';
import $ from 'jQuery';

import styles from '../../styles/components/button.module.scss';

export default function Button({containerStyle, href, disabled, buttonStyle, children, disabledElem}) {
    /*
    useEffect(() => {
        $(function() {
            $("form").on("click", function(e) {
                e.stopPropagation();
            });
        });
    });
    */

    return (
        <form className={[styles.container, containerStyle].join(" ")} action={href} target="_blank">
            <div className={styles.container_anim}>
                <button disabled={disabled} className={buttonStyle}>
                    <span className={styles.container_anim_default}>
                        {children}
                    </span>
                    <span className={styles.container_anim_disabled}>
                        {disabledElem}
                    </span>
                </button>
            </div>
        </form>
    )
}