import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

import { RouteParams } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const movieId = parseInt(id, 10);

    if (isNaN(movieId)) {
      return NextResponse.json(
        {
          name: "NotANumber",
          message: "ID must be a valid number",
          status: 400,
        },
        { status: 400 }
      );
    }

    const screenings = await prisma.screenings.findMany({
      where: {
        movieId: movieId,
      },
    });

    return NextResponse.json(screenings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        name: "ServerError",
        message: "Could not fetch screenings",
        status: 500,
      },
      { status: 500 }
    );
  }
}