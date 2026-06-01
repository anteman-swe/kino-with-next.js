import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const movieId = Number(id);

    if (Number.isNaN(movieId)) {
      return NextResponse.json(
        { name: "NotANumber", message: "ID must be a valid number", status: 400 },
        { status: 400 }
      );
    }

    console.log("movieId:", movieId);

const allScreenings = await prisma.screening.findMany();
console.log("all screenings:", allScreenings);

    const screenings = await prisma.screening.findMany({
      where: {
        movieId,
      },
    });

    return NextResponse.json({
      movieId,
      screenings,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { name: "ServerError", message: "Could not fetch screenings", status: 500 },
      { status: 500 }
    );
  }
}