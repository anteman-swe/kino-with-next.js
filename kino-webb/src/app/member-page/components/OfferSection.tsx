"use client";

import { Offer as fetchOffer } from "@/generated/prisma/client";
import Offer from "./Offer";
import styles from './OfferSection.module.scss';

const oneDayms = 24 * 60 * 60 *1000;

async function getOffers() {
  try {
    const response = await fetch("/api/offers");
    const result = await response.json();
    return result as fetchOffer[];
  } catch {;
    return null;
  }
}

const theOffers = await getOffers();
console.log('Offers:', theOffers);
const convertedOffers = theOffers?.map((element) => ({
    ...element,
    createdAt: new Date(element.createdAt),
}));

const OfferSection: React.FC = () => {
  
  return (
    <>
        <h3 className={styles.offerHeadline}>Erbjudanden</h3>
        <div className={styles.offerSection}>
        {convertedOffers?.map((element) => (
            <Offer
            key={element.id}
            offerImageType={element.type}
            offerHeadline={element.title}
            offerText={element.text}
            offerPrice={element.price}
            offerImageUrl={element.picture}
            validTo={(new Date(element.createdAt.getTime() + element.validForDays * oneDayms)).toISOString().split('T')[0]}
            />
        ))}
        </div>
    </>
    
  )
};

export default OfferSection;