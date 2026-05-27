import Offer from "./Offer";
import { useEffect } from "react";

export const OfferSection: React.FC = () => {
    useEffect(() => {
        const memberOffers = async () => {
            return fetch('/api/')
        }
    }, [])


    return (
        <>
            
        </>
    )
}