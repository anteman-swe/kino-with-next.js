import { Otype } from "@/generated/prisma/enums";

export const offers = [
    {
        id: 1,
        type: Otype.MOVIE,
        title: "Gå 2 för priset av 1",
        text: "Bjud med en kompis på bio! Gå två och betala för en till valfri film",
        picture: "",
        price: 125,
        createdAt: new Date("2026-05-26"),
        validForDays: 30
    },
    {
        id: 2,
        type: Otype.SNACKS,
        title: "Köp extra snacks till filmen",
        text: "30% rabatt på ett köp av valfria snacks i samband med biobesök",
        picture: "",
        price: null,
        createdAt: new Date("2026-05-26"),
        validForDays: 30
    },
    {
        id: 3,
        type: Otype.FOOD,
        title: "Lunch på tisdagar till bra pris!",
        text: "Få 25% rabatt på lunchen på tisdagar",
        picture: "",
        price: null,
        createdAt: new Date("2026-05-26"),
        validForDays: 180
    },
    {
        id: 4,
        type: Otype.COMBO,
        title: "Dagens film och popcorn på köpet!",
        text: "Gå på dagens film och få en gratis popcorn till filmen.",
        picture: "",
        price: 125,
        createdAt: new Date("2026-05-26"),
        validForDays: 15
    }
];