import styles from "./page.module.scss";

//import { Drawer } from '@base-ui/react/drawer';  // Importera för att göra en panel för settings?
import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma/enums";
import OfferSection from "./components/OfferSection";
import ReviewInputModule from "./components/ReviewInputSection";


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
            <OfferSection />
            
            <div className={styles['members__offers--images']}>
            </div>
        </section>
        <ReviewInputModule />
        </>
    )
};

export default Memberpage;