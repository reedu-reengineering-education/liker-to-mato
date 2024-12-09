// src/app/api/subscription/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { plan } = body;

    if (!plan || !["basic", "pro", "enterprise"].includes(plan)) {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    // Update user's plan in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        planId: plan.id,
        planActiveUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });

    // Get the updated user with the plan relation
    const userWithPlan = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { plan: true }
    });

    return NextResponse.json({
      plan: userWithPlan?.plan || {
        id: "plan_free",
        name: "Free",
        price: 0,
        features: ["Create surveys", "Basic analytics"],
      },
      planActiveUntil: userWithPlan?.planActiveUntil
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        plan: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      plan: user.plan || {
        id: "plan_free",
        name: "Free",
        price: 0,
        description: "Kostenloser Plan",
        features: [
          "1 Umfrage",
          "50 Antworten pro Monat",
          "Basis-Auswertungen",
          "Community Support",
        ],
      },
      planActiveUntil: user.planActiveUntil,
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
