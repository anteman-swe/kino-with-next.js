// api/movies/[id]/reviews

import { NextRequest, NextResponse } from "next/server";
import { RouteParams } from '@/types';
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const movieId = parseInt(id, 10);

        if (isNaN(movieId)) {
            return NextResponse.json({ 
                name: "NotANumber",
                message: "ID must be a valid number",
                status: 500
            });
        }
        const theMoviesReviews = await prisma.review.findMany({
            where: { movieId },
        });

        return NextResponse.json(theMoviesReviews);

    } catch(err) {
        console.error('Error getting movie reviews from db:', err);
        return NextResponse.json({
            name: "dbError",
            message: "Could not get movie reviews from DB",
            status: 400
        });
    }
} 