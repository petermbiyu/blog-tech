import { auth } from "@/lib/auth";
import { exec } from "child_process";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorised" },
        { status: 401 },
      );
    }
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const coverImage = formData.get("coverImage") as File;

    if (!title || !content || !excerpt || !coverImage) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }
    // alug
  } catch (error) {
    console.error("create_post_error:", error);
    return NextResponse.json(
      { success: false, message: "failed to create post" },
      { status: 500 },
    );
  }
}
