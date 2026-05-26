import styles from "./page.module.scss";

import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { Otype, Role } from "@/generated/prisma/enums";
import Offer from "./components/Offer";

// Temporary plejshålder för "functions"
const offerHeadline: string = "Standard erbjudande!";
const offerText: string = "Vi erbjuder alltid något för alla!";
const offerPrice: number = 180;
const offerImageType: Otype = Otype.MOVIE
const offerImageUrl: string = ''; //'/starwars_echoes_the_force.png';
const validTo: string = '2026-05-30';  


const Memberpage = async () => {
    const session = await auth();

    const thisUser = (session?.user?.name);

    if (!session?.user) {
        redirect("/"); // If not user not logged in redirect back to start
    }

    if (session?.user?.role  === Role.ADMIN) {
        redirect("/admin"); // If user is admin redirect to admin page
    }

    return (
        <>
        <section className={styles.members__offers}>
            <h2 className={styles['members__offers--title']}>Medlemssida</h2>
            <p className={styles['members__offers--name']}>{thisUser}</p>
            <Offer
            offerHeadline={offerHeadline}
            offerText={offerText}
            offerPrice={offerPrice}
            offerImageType={offerImageType}
            offerImageUrl={offerImageUrl}
            validTo={validTo}
            />
            <div className={styles['members__offers--images']}>

            </div>
        </section>
        </>
    )
};

export default Memberpage;