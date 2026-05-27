import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function GET() {
    const oneDayms: number = (24 * 60 * 60 * 1000);

    const memberOffers = await prisma.offer.findMany({});
    memberOffers
    .sort((a, b) => (
        (a.createdAt.getTime() + a.validForDays * oneDayms)
         - (b.createdAt.getTime() + b.validForDays * oneDayms)));
    if (memberOffers.length  > 5) {
        return memberOffers.splice(5)
    } else return NextResponse.json(memberOffers);
}
