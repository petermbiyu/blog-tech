import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import slugify from "slugify";
import { NextRequest, NextResponse } from "next/server";
import {
  CloudinaryUploadResult,
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/services/cloudinary";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Fetch_post_error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const existing = await prisma.post.findUnique({ where: { id: postId } });
    if (!existing) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }
    if (existing.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const coverImage = formData.get("coverImage") as File;

    let slug = existing.slug;
    if (title && title !== existing.title) {
      const baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
      });
      let uniqueslug = baseSlug;
      let counter = 1;

      while (
        await prisma.post.findUnique({
          where: { slug: uniqueslug, NOT: { id: postId } },
        })
      ) {
        uniqueslug = `${baseSlug}-counter`;
        counter++;
      }
      slug = uniqueslug;
    }
    let imageData: CloudinaryUploadResult | null = null;
    if (coverImage) {
      imageData = await uploadToCloudinary(coverImage);

      if (imageData && existing.coverImagePublicId) {
        await deleteFromCloudinary(existing.coverImagePublicId);
      }
    }
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: title ?? existing.title,
        slug,
        content: content ?? existing.content,
        excerpt: excerpt ?? existing.excerpt,
        ...(imageData && {
          coverImageURL: imageData.secure_url,
          coverImagePublicId: imageData.public_id,
        }),
      },
    });
    return NextResponse.json(
      { success: true, post: updatedPost },
      { status: 200 },
    );
  } catch (error) {
    console.error("update_post_error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const { postId } = await params;
    if (!postId) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return NextResponse.json({ error: "post not found" }, { status: 404 });
    }
    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (post.coverImagePublicId) {
      await deleteFromCloudinary(post.coverImagePublicId);
    }
    await prisma.post.delete({ where: { id: postId } });
    return NextResponse.json(
      { success: true, message: "post deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete_post_error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}
