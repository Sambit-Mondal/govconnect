import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const serviceId = parseInt(id, 10);

    if (isNaN(serviceId)) {
      return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        department: {
          select: {
            name: true,
            code: true,
            head_office_address: true,
            contact_email: true,
            contact_phone: true
          }
        }
      }
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service }, { status: 200 });
  } catch (error: any) {
    console.error("Get service error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
