// src/app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { RouteParams } from '@/types';
import { prisma } from "@/lib/prisma";


export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const movieIdNum = parseInt(id, 10);

    if (isNaN(movieIdNum)) {
      return NextResponse.json({
        name: "NotANumber",
        message: "ID must be a valid number",
      }, { status: 400 });
    }

    const theReviews = await prisma.review.findMany({
      where: { movieId: movieIdNum },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(theReviews, { status: 200 });
  } catch (err) {
    console.error('Error getting reviews from db:', err);
    return NextResponse.json({
      name: "dbError",
      message: "Could not get reviews from DB"
    }, { status: 500 });
  }
}

