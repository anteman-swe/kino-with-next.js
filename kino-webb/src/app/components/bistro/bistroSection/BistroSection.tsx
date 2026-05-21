import styles from "./BistroSection.module.scss";
import BistroBanner from "../bistroBanner/BistroBanner";
export default function BistroSection() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Café&Bistro</h1>

      <section className={styles.section}>
         <BistroBanner />
      </section>
    </div>
  );
}
