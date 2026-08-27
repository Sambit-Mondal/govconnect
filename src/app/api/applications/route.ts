import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined;

    // If admin, they might fetch all applications, but this endpoint is usually for the user
    // We'll restrict to the logged in user for now.
    const whereClause: any = {};
    if (session.role !== "admin") {
      whereClause.user_id = session.userId;
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        service: {
          select: { name: true, category: true }
        }
      }
    });

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error: any) {
    console.error("Get applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { service_id, type, data } = body;

    if (!service_id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const application = await prisma.application.create({
      data: {
        user_id: session.userId,
        service_id,
        type: type || "standard",
        data: data || {},
        status: "pending",
      },
    });

    return NextResponse.json({ 
      message: "Application created successfully", 
      application 
    }, { status: 201 });
  } catch (error: any) {
    console.error("Create application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
