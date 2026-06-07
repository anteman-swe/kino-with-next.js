// api/movies

import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const response = await prisma.movie.findMany({});
        return NextResponse.json(response);
    } catch(err) {
        console.error('Error getting multiple movies from db:', err);
        return NextResponse.json({
            name: "dbError",
            message: "Could not get any movies from DB"
        }, {
            status: 500
        });
    }
    
}