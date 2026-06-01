import { NextRequest, NextResponse } from "next/server";

import { RouteParams } from '@/types'


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
        // Kod för att hämta film från databasen
    } catch {
        // Kod för att fånga fel, error
    }
} 

// import { NextRequest, NextResponse } from "next/server";

