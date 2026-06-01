// api/offers

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Otype } from '@/generated/prisma/enums';


export async function GET() {
    try {
        const oneDayms: number = (24 * 60 * 60 * 1000);

        const memberOffers = await prisma.offer.findMany({});
        if(!memberOffers) {
            return NextResponse.json({
                name: "dbError",
                message: "Could not find any member offers in the DB",
                status: 404
            });
        }
        memberOffers.sort((a, b) => (
            (a.createdAt.getTime() + a.validForDays * oneDayms)
            - (b.createdAt.getTime() + b.validForDays * oneDayms)));
        if (memberOffers.length  > 4) {
            return NextResponse.json(memberOffers.splice(4))
        } else return NextResponse.json(memberOffers);
    }catch {
        return NextResponse.json({
            name: "dbError",
            message: "Could not get any member offers from DB",
            status: 500
        });
    }
    
}

export async function POST(request: NextRequest) {
    try {
    const body = await request.json();
    const bodyWithEnums = {
        ...body,
        type: body.type as Otype,
    };
    const {type, title, text, picture, price, validForDays} = bodyWithEnums;

    if (!(type && title && text && picture && validForDays)) {
        return NextResponse.json({
            name: "API-Error",
            message: "Invalid data for creating an member offer",
            status: 400
        });
    }

    const offer = await prisma.$transaction(async (no) => {
        const createdOffer = await no.offer.create({
            data: {
                type,
                title,
                text,
                picture,
                price,
                validForDays, 

            },
        });
        return createdOffer;
    });
    return NextResponse.json(offer, { status: 201 });
    } catch {
        return NextResponse.json({
            name: "dbError",
            message: "Could not create an member offer in the DB",
            status: 500
        });
    }
}
