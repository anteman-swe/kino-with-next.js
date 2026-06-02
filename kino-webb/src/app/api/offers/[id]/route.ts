// api/offers/[id]

import { NextRequest, NextResponse } from "next/server";
import { RouteParams } from '@/types';
import { prisma } from "@/lib/prisma";




export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const offerId = parseInt(id, 10);

        if (isNaN(offerId)) {
            return NextResponse.json({ 
                name: "NotANumber",
                message: "ID must be a valid number",
                status: 500
            });
        }
        const theOffer = await prisma.offer.findUnique({
            where: { id: offerId },
        });

        if (!theOffer) {
            return NextResponse.json({
                name: "dbError",
                message: "Could not find any offer in the DB",
                status: 404
            })
        }
        return NextResponse.json(theOffer);

    } catch {
        return NextResponse.json({
            name: "dbError",
            message: "Could not get an offer from DB",
            status: 500
        });
    }
} 