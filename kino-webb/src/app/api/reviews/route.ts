// api/reviews

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const response = await prisma.review.findMany({});
    if (!response) {
      return NextResponse.json({
        name: "dbError",
        message: "Could not find any review in DB",
        status: 404,
      });
    }
    return NextResponse.json(response);
  } catch (err) {
    console.error("Error getting reviews from db:", err);
    return NextResponse.json({
      name: "dbError",
      message: "Could not get any reviews from DB",
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { movieId, userId, userName, rating, comment } = body;
    //NOT(movieId AND (userId XOR userName) AND rating AND comment)
    if (!(movieId && !userId != !userName && rating && comment)) {
      return NextResponse.json({
        name: "API-Error",
        message: "Invalid data for creating an movie review",
        status: 400,
      });
    }
    const uName = userName ? userName : "";
    const verified = userId !== null ? true : false;
    const review = await prisma.$transaction(async (rev) => {
      const createdReview = await rev.review.create({
        data: {
          movieId,
          userId,
          userName: uName,
          rating,
          comment,
          verified,
        },
      });
      return createdReview;
    });
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({
      name: "dbError",
      message: "Could not create an review",
      status: 500,
    });
  }
}
