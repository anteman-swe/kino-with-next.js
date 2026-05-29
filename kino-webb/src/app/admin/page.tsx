import styles from "./page.module.scss";

import { auth } from '@/auth';
import { redirect } from "next/navigation";

const Adminpage = async () => {
    const session = await auth();
    const adminID = session?.user?.id;
    
    if (!session?.user) {
       redirect("/");
    }
    
    if (session?.user?.role !== "ADMIN") {
        redirect("/");
    } else {
        return (
            <>
            <h1 className={styles.headLine}>Admin Page, ID: {adminID}</h1>
            </>
        )
    }
    
};
export default Adminpage;