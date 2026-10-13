import { prisma } from "@/lib/prisma";

export async function PostBySlug(slug: string) {
  if (!slug) {
    throw new Error("Slug is required");
  }
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      excerpt: true,
      coverImageURL: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  if (!post) {
    return null;
  }
  return post;
}
