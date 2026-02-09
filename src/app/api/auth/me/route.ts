import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({
        message: "Unauthorized",
      },
      {
        status: 401
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.id)
      }
    });
    return NextResponse.json({
      ...user,
      password: undefined
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}