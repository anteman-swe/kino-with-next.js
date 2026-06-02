import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookStatus, Prisma } from "@/generated/prisma/client";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json(
      { message: "Could not fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { userId, screeningId, seats, totalPrice } = body;

    if (
      typeof userId !== "number" ||
      typeof screeningId !== "number" ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      typeof totalPrice !== "number"
    ) {
      return NextResponse.json(
        { message: "Invalid booking data" },
        { status: 400 }
      );
    }

    const screening = await prisma.screening.findUnique({
      where: { id: screeningId },
    });

    if (!screening) {
      return NextResponse.json(
        { message: "Screening not found" },
        { status: 404 }
      );
    }

    if (screening.availableSeats < seats.length) {
      return NextResponse.json(
        { message: "Not enough available seats" },
        { status: 400 }
      );
    }

    const booking = await prisma.$transaction(async (tx) => {
      const createdBooking = await tx.booking.create({
        data: {
          userId,
          screeningId,
          seats,
          totalPrice,
          status: BookStatus.CONFIRMED,
        },
      });

        await tx.bookingSeat.createMany({
          data: seats.map((seat: string) => ({
          bookingId: createdBooking.id,
          screeningId,
          seat,
    })),
    });

      await tx.screening.update({
        where: { id: screeningId },
        data: {
          availableSeats: {
            decrement: seats.length,
          },
        },
      });

      return createdBooking;
    });

    return NextResponse.json(booking, { status: 201 });
} catch (error) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return NextResponse.json(
      { message: "One or more seats are already booked" },
      { status: 409 }
    );
  }

  console.error("POST /api/bookings failed:", error);

  return NextResponse.json(
    { message: "Could not create booking" },
    { status: 500 }
  );
}}