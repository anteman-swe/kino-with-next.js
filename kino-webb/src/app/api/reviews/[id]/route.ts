// src/app/api/review/[id]/route.ts
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


export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const numericMovieId = parseInt(id, 10);

    if (isNaN(numericMovieId)) {
      return NextResponse.json({ error: "Invalid Movie ID path" }, { status: 400 });
    }

    const body = await request.json();
    const { comment, rating, username, userId } = body; 

    // Validate incoming data
    if (!username || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Clean, direct creation completely aligned with the schema fields
    const newReview = await prisma.review.create({
      data: {
        comment: comment.trim(),
        rating: Number(rating),
        movieId: numericMovieId,
        userName: username.trim(), 
        userId: Number(userId) || 1, // user ID 1 if none provided
        verified: false,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("CRITICAL BACKEND ERROR SAVING REVIEW:", error);
    return NextResponse.json({ error: "Could not save review to DB" }, { status: 500 });
  }
}