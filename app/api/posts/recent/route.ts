import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const post = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageURL: true,
        createdAt: true,
      },
      take: 6,
    });
    return NextResponse.json({ success: true, post }, { status: 200 });
  } catch (error) {
    console.error("Fetch_recent_post_error", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch recent post" },
      { status: 500 },
    );
  }
}
