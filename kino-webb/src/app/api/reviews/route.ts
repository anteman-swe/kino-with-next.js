// api/reviews

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const response = await prisma.review.findMany({});
        return NextResponse.json(response);
    } catch(err) {
        console.error('Error getting reviews from db:', err);
        return NextResponse.json({
            name: "dbError",
            message: "Could not get any reviews from DB",
            status: 400
        });
    }
    
}