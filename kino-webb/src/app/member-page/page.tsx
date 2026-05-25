import styles from "./page.module.scss";

import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma/enums";

const Memberpage = async () => {
    const session = await auth();

    const thisUser = (session?.user?.name);

    if (!session?.user) {
        redirect("/");
    }

    if (session?.user?.role  === Role.ADMIN) {
        redirect("/admin");
    }

    return (
        <>
        <section className={styles.members__offers}>
            <h2 className={styles['members__offers--title']}>Member page: {thisUser}</h2>
            <div className={styles['members__offers--images']}>

            </div>
        </section>
        </>
    )
};

export default Memberpage;