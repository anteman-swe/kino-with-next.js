import { Otype } from '@/generated/prisma/enums';
import styles from './Offer.module.scss';
import Image from 'next/image';
import { useMemo } from 'react';
import { Decimal } from '@prisma/client/runtime/client';

export interface OfferProps {
    offerImageType: Otype;
    offerHeadline: string;
    offerText: string;
    offerPrice: Decimal | null;
    offerImageUrl: string;
    validTo: string;
}

export default function Offer({ offerImageType, offerHeadline, offerText, offerPrice, offerImageUrl, validTo }: OfferProps) {
    const choiceImage = useMemo(() => {
        if(offerImageUrl === '') {
            return (offerImageType === Otype.MOVIE ? '/movieimg.png' :
                    offerImageType === Otype.FOOD ? '/foodimg.png' : 
                    offerImageType === Otype.SNACKS ? '/snacksimg.png' :
                    offerImageType === Otype.COMBO ? '/comboimg.png' :
                    '/member/defaultimg.png') // Default choice if no other
        } else return offerImageUrl;
    },[offerImageType, offerImageUrl]);
    
    
    return (
        <>
        <div className={styles.card}>
            <Image
            className={styles['card__img']}
            src={choiceImage}
            alt='Medlemserbjudande!'
            width={200}
            height={300}
            loading='eager'
            />
            <div className={styles['card__offer']}>
                <h3>{offerHeadline}</h3>
                <p className={styles['card__offer--text']}>{offerText}</p>
                <p className={styles['card__offer--price']}>{offerPrice === null ? "" : offerPrice.toString() + " kr"}</p>
                <p className={styles['card__offer--validity']}>Giltigt t o m: {validTo}</p>
                
            </div>
        </div>
        </>
    )
}

