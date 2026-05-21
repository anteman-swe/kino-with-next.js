import styles from "./page.module.scss";

import { auth } from '@/auth';
import { redirect } from "next/navigation";

const Memberpage = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <>
        <h1 className={styles.headLine}>Member Page</h1>
        </>
    )
};

export default Memberpage;