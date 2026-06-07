import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saltAndHashPassword } from "@/app/utils/password";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json(
  {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
  { status: 201 }
);

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}