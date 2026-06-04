import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { RouteParams } from "@/types";

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const movieId = parseInt(id, 10);

    if (isNaN(movieId)) {
      return NextResponse.json(
        { message: "ID must be a valid number" },
        { status: 400 }
      );
    }

const screenings = await prisma.screening.findMany({
  where: {
    movieId: movieId,
    startsAt: {
      gte: new Date().toISOString().slice(0, 19),
    },
  },
  orderBy: {
    startsAt: "asc",
  },
});

    return NextResponse.json(screenings);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}