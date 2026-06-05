import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const screeningId = Number(id);

  if (Number.isNaN(screeningId)) {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const seats = await prisma.bookingSeat.findMany({
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
    bookedSeats: seats.map((item) => item.seat),
  });
}