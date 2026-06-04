import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const screeningId = Number(id);

    if (Number.isNaN(screeningId)) {
      return NextResponse.json(
        { message: "Invalid screening id" },
        { status: 400 },
      );
    }

    const bookedSeats = await prisma.bookingSeat.findMany({
      where: {
        screeningId,
        booking: {
          status: "CONFIRMED",
        },
      },
      select: {
        seat: true,
      },
    });

    return NextResponse.json({
      bookedSeats: bookedSeats.map((item) => item.seat),
    });
  } catch (error) {
    console.error("GET /api/screenings/[id]/seats failed:", error);

    return NextResponse.json(
      { message: "Could not fetch booked seats" },
      { status: 500 },
    );
  }
}