// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const response = await prisma.review.findMany({});
    if (!response || response.length === 0) {
        return NextResponse.json({
            name: "dbError",
            message: "Could not find any reviews in DB",
        }, { status: 404 });
    }
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error getting reviews from db:", err);
    return NextResponse.json({
        name: "dbError",
        message: "Could not get any reviews from DB",
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const movieId = body.movieId;
    const userId = body.userId;
    const rating = body.rating;
    const comment = body.comment;
    const userName = body.userName; 


    if (movieId === undefined || userId === undefined || rating === undefined || !comment || !userName) {
        return NextResponse.json({
            name: "API-Error",
            message: "Invalid data for creating a movie review. All fields are required.",
        }, { status: 400 });
    }



    const review = await prisma.$transaction(async (rev) => {
      const createdReview = await rev.review.create({
        data: {
          movieId: Number(movieId),
          userId: Number(userId),
          rating: Number(rating),
          comment: comment.trim(),
          userName: userName.trim(),
          verified: true,
        },
      });
      return createdReview;
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
      console.error("Transaction Error:", err);
      return NextResponse.json({
          name: "dbError",
          message: "Could not create a review",
      }, { status: 500 });
  }
}