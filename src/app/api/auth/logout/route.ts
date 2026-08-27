import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: new Date(0), // expire immediately
    path: "/",
  });

  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
