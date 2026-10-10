import { auth } from "@/lib/auth";
import slugify from "slugify";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // const id = searchParams.get("id")
    const default_limit = 3;
    const limit = Number(searchParams.get("limit")) || default_limit;
    const cursor = searchParams.get("cursor");

    const posts = await prisma.post.findMany({
      take: limit + 1,
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      select: {
        id: true,
        excerpt: true,
        title: true,
        slug: true,
        coverImageURL: true,
        createdAt: true,
      },
    });
    // has more posts
    const hasMore = posts.length > limit;
    const items = hasMore ? posts.slice(0, limit) : posts;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json(
      { success: true, posts: items, nextCursor },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch_Post_error:", error);
    return NextResponse.json(
      { success: false, message: "failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
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
    const baseSlug = slugify(title, { lower: true, strict: true, trim: true });
    // uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${slug}-${counter}`;
      counter++;
    }
    // upload cover image
    const imageData: CloudinaryUploadResult =
      await uploadToCloudinary(coverImage);
    const post = await prisma.post.create({
      data: {
        title,
        excerpt,
        slug,
        content,
        coverImageURL: imageData.secure_url,
        coverImagePublicId: imageData.public_id,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(
      { success: true, post, message: "success" },
      { status: 201 },
    );
  } catch (error) {
    console.error("create_post_error:", error);
    return NextResponse.json(
      { success: false, message: "failed to create post" },
      { status: 500 },
    );
  }
}
