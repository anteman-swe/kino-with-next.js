import styles from "./BistroSection.module.scss";
import BistroBanner from "../bistroBanner/BistroBanner";
import BistroOffers from "../bistroOffers/BistroOffers";

export default function BistroSection() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Café&Bistro</h1>

      <section className={styles.section}>
         <BistroBanner />
         <BistroOffers />
      </section>
    </div>
  );
}
