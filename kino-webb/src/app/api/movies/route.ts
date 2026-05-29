// import { NextRequest, NextResponse } from "next/server";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function GET() {
    const response = await prisma.movie.findMany({});
    return NextResponse.json(response);
}