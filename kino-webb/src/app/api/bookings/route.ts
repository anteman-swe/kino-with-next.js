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
  } catch (error) {
    console.error("GET /api/bookings failed:", error);

    return NextResponse.json(
      { message: "Kunde inte hämta bokningar" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, screeningId, seats, totalPrice, guestEmail, guestPhone } = body;

    if (
      typeof userId !== "number" ||
      typeof screeningId !== "number" ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      typeof totalPrice !== "number"
    ) {
      return NextResponse.json(
        { message: "Ogiltig bokningsdata" },
        { status: 400 },
      );
    }

    const hasGuestEmail =
      typeof guestEmail === "string" && guestEmail.trim().length > 0;

    const hasGuestPhone =
      typeof guestPhone === "string" && guestPhone.trim().length > 0;

    const isGuest = userId === 1;

    if (isGuest && !hasGuestEmail && !hasGuestPhone) {
      return NextResponse.json(
     {
        message: "E-post eller telefonnummer krävs för att boka utan inloggning",
     },
     { status: 400 },
   );
}

    const screening = await prisma.screening.findUnique({
      where: { id: screeningId },
    });

    if (!screening) {
      return NextResponse.json(
        { message: "Visningen hittades inte" },
        { status: 404 },
      );
    }

    if (screening.availableSeats < seats.length) {
      return NextResponse.json(
        { message: "Det finns inte tillräckligt många lediga platser" },
        { status: 400 },
      );
    }

    const booking = await prisma.$transaction(async (tx) => {
      const createdBooking = await tx.booking.create({
        data: {
          userId,
          screeningId,
          seats,
          totalPrice,
          guestEmail: userId !== 1 ? null : hasGuestEmail ? guestEmail.trim() : null,
          guestPhone: userId !== 1 ? null : hasGuestPhone ? guestPhone.trim() : null,
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
        { message: "En eller flera platser är redan bokade" },
        { status: 409 },
      );
    }

    console.error("POST /api/bookings failed:", error);

    return NextResponse.json(
      { message: "Kunde inte skapa bokning" },
      { status: 500 },
    );
  }
}