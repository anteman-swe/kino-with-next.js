import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookStatus } from "@/generated/prisma/client";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const bookingId = Number(id);

    if (Number.isNaN(bookingId)) {
      return NextResponse.json(
        { message: "ID must be a valid number" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
} catch (error) {
  console.error("GET /api/bookings/[id] failed:", error);
    return NextResponse.json(
      { message: "Could not fetch booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const bookingId = Number(id);

    if (Number.isNaN(bookingId)) {
      return NextResponse.json(
        { message: "ID must be a valid number" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    const deletedBooking = await prisma.$transaction(async (tx) => {
      const deleted = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookStatus.CANCELLED,
        },
      });

      await tx.screening.update({
        where: { id: booking.screeningId },
        data: {
          availableSeats: {
            increment: booking.seats.length,
          },
        },
      });

      return deleted;
    });

    return NextResponse.json(deletedBooking);
} catch (error) {
  console.error("GET /api/bookings/[id] failed:", error);
    return NextResponse.json(
      { message: "Could not delete booking" },
      { status: 500 }
    );
  }
}