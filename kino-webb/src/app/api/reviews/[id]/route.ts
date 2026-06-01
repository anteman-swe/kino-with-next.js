// api/review/[id]

import { NextRequest, NextResponse } from "next/server";
import { RouteParams } from '@/types';
import { prisma } from "@/lib/prisma";




export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const reviewId = parseInt(id, 10);

        if (isNaN(reviewId)) {
            return NextResponse.json({ 
                name: "NotANumber",
                message: "ID must be a valid number",
                status: 500
            });
        }
        const theReview = await prisma.review.findUnique({
            where: { id: reviewId },
        });

        if (!theReview) {
            return NextResponse.json({
                name: "dbError",
                message: "Could not find a review in the DB",
                status: 404
            })
        }
        return NextResponse.json(theReview);

    } catch(err) {
        console.error('Error getting a review from db:', err);
        return NextResponse.json({
            name: "dbError",
            message: "Could not get a review from DB",
            status: 500
        });
    }
} 