import Image from "next/image";
import styles from "./BistroOffers.module.scss";
import Link from "next/link";


export default function BistroOffers() {
 
  const offers = [
    {
      id: 1,
      title: "Köp frukost och se en film!",
      image: "/bistro/breakfast.png",
      href: "/",
    },
    {
      id: 2,
      title: "Passa på att se en film när ni äter lunch!",
      image: "/bistro/lunch.png",
      href: "/",
    },
    {
      id: 3,
      title: "Bjud någon på middag med film!",
      image: "/bistro/dinner.png",
      href: "/",
    },
    {
      id: 4,
      title: "Färdiga snacks med filmen!",
      image: "/bistro/snacks.png",
      href: "/",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Våra paketerbjudanden</h2>

      <div className={styles.grid}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            title={offer.title}
            image={offer.image}
            href={offer.href}
          />
        ))}
      </div>
    </div>
  );
}

// 2. OFFER CARD – återanvänds 4 gånger
function OfferCard({ title, image, href }: { title: string; image: string; href: string; }) {
  return (
     <Link href={href} className={styles.card}>
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className={styles.image}
      />
      <p className={styles.title}>{title}</p>
    </Link>
  );
}
