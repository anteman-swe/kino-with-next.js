// api/movies/[id]

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
                status: 400
            });
        }
        const theMovie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        return NextResponse.json(theMovie);

    } catch(err) {
        console.error('Error getting movie from db:', err);
        return NextResponse.json({
            name: "dbError",
            message: "Could not get movie from DB",
            status: 400
        });
    }
} 