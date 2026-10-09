import { auth } from "@/lib/auth";
import slugify from "slugify";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";

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
      { success: true, message: "success" },
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
