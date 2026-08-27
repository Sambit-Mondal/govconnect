import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const whereClause: any = {
      is_active: true,
    };

    if (category) {
      whereClause.category = category;
    }

    const services = await prisma.service.findMany({
      where: whereClause,
      orderBy: {
        name: 'asc'
      },
      include: {
        department: {
          select: {
            name: true,
            code: true
          }
        }
      }
    });

    return NextResponse.json({ services }, { status: 200 });
  } catch (error: any) {
    console.error("Get services error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
