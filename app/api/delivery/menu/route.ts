import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    let items;
    if (!category || category === 'ALL') {
      items = await prisma.menuItem.findMany({
        where: { isAvailable: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      items = await prisma.menuItem.findMany({
        where: {
          isAvailable: true,
          category: category as any,
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}