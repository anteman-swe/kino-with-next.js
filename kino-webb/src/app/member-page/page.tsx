import styles from "./page.module.scss";

import { auth } from '@/auth';
import { redirect } from "next/navigation";
import { Role } from "@/generated/prisma/enums";

const Memberpage = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    if (session?.user?.role  === Role.ADMIN) {
        redirect("/admin");
    }

    return (
        <>
        <h1 className={styles.headLine}>Member Page</h1>
        </>
    )
};

export default Memberpage;