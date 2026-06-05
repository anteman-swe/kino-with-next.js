import Link from "next/link";
import UpcomingScreenings from "@/app/components/upcoming-screenings/UpcomingScreenings";
import styles  from './Subpages.module.scss';

export default function Page() {

    return (
        <>
            <UpcomingScreenings />
            <Link href={"/"} className={styles.linkBack}>
                <span className={styles.linkArrow}> &#10226; </span> Tillbaka till startsidan</Link>
        </>
    );
}