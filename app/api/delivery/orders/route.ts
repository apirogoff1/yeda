import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().regex(/^\+7\d{10}$/),
  customerAddress: z.string().min(10),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
    })
  ),
  totalPrice: z.number(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    const order = await prisma.order.create({
      data: {
        customerName: validatedData.customerName,
        customerPhone: validatedData.customerPhone,
        customerAddress: validatedData.customerAddress,
        totalPrice: validatedData.totalPrice,
        items: validatedData.items as any,
      },
    });

    return NextResponse.json(
      { orderId: order.id, status: 'success' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}