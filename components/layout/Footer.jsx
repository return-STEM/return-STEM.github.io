import styles from '../../styles/layout/footer.module.scss';
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer(props) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_cont}>
                <a href="https://www.instagram.com/returnstem/" target="_blank" rel="noreferrer" className={styles.footer_button}>
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100070855052861" target="_blank" rel="noreferrer" className={styles.footer_button}>
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://mail.google.com/mail/?view=cm&source=mailto&to=contact.returnstem@gmail.com" target="_blank" rel="noreferrer" className={styles.footer_button}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </div>
            <h1 className={styles.footer_text}>Copyright <FontAwesomeIcon icon={faCopyright} /> 2022 All Rights Reserved</h1>
        </footer>
    )
}