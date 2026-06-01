import { NextRequest, NextResponse } from "next/server";
import { RouteParams } from '@/types';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


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