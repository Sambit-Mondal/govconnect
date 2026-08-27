import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const applicationId = parseInt(id, 10);

    if (isNaN(applicationId)) {
      return NextResponse.json({ error: "Invalid application ID" }, { status: 400 });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        service: true,
        user: {
          select: { name: true, email: true }
        }
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Check ownership unless admin
    if (session.role !== "admin" && application.user_id !== session.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error: any) {
    console.error("Get application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const applicationId = parseInt(id, 10);
    const body = await request.json();

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Role-based logic
    let updateData: any = {};
    if (session.role === "admin") {
      // Admin can update status, approved_at, rejected_at, etc.
      if (body.status) updateData.status = body.status;
      if (body.rejection_reason) updateData.rejection_reason = body.rejection_reason;
      
      if (body.status === "approved") {
        updateData.approved_at = new Date();
      } else if (body.status === "rejected") {
        updateData.rejected_at = new Date();
      }
    } else {
      // Citizen can only update data if it's still pending
      if (application.user_id !== session.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      if (application.status !== "pending") {
        return NextResponse.json({ error: "Cannot update an application that is no longer pending" }, { status: 400 });
      }
      if (body.data) updateData.data = body.data;
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: updateData,
    });

    return NextResponse.json({ 
      message: "Application updated successfully", 
      application: updatedApplication 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Update application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const applicationId = parseInt(id, 10);

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Only allow deletion if user owns it and it's pending, or if user is admin
    if (session.role !== "admin") {
      if (application.user_id !== session.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      if (application.status !== "pending") {
        return NextResponse.json({ error: "Cannot delete an application that is already processed" }, { status: 400 });
      }
    }

    await prisma.application.delete({
      where: { id: applicationId },
    });

    return NextResponse.json({ message: "Application deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Delete application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
