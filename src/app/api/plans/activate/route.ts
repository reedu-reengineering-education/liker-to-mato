import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, paymentDetails } = await req.json();

    // Validiere die Zahlung (hier später PayPal Webhook Integration)
    if (!paymentDetails?.id) {
      return NextResponse.json({ error: 'Invalid payment details' }, { status: 400 });
    }

    // Hole den Plan aus der Datenbank
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Plan aktivieren
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        planId: planId,
        planActiveUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 Tage
      },
      include: {
        plan: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error activating plan:', error);
    return NextResponse.json({ error: 'Failed to activate plan' }, { status: 500 });
  }
}
