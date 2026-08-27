import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, aadhar_number } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    if (aadhar_number) {
      const existingAadhar = await prisma.user.findUnique({
        where: { aadhar_number },
      });
      if (existingAadhar) {
        return NextResponse.json({ error: "User with this Aadhar number already exists" }, { status: 400 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        aadhar_number,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    const response = NextResponse.json({ 
      message: "User registered successfully", 
      user: userWithoutPassword,
      token
    }, { status: 201 });

    // Set HTTP-Only Cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
