import Link from "next/link";
import styles from './not-found.module.scss';

export default function NotFound() {

    return (
        <div className={styles.container}>
            <h1>404 - Sidan hittades inte</h1>
            <p>Tyvärr kunde vi inte hitta den sida som du letade efter</p>

            <Link
                href={"/"}
                className={styles.returnLink}
            >Gå tillbaka till startsidan
            </Link>
        </div>
    )
}