import BlogView from "@/components/blogPage/blogView";
import { PostBySlug } from "@/server-actions/post";
import { Suspense } from "react";

const ArticleView = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const postPromise = PostBySlug(slug);
  return (
    <Suspense fallback={<p className="text-gray-300">Loading...</p>}>
      <BlogView postPromise={postPromise} />
    </Suspense>
  );
};

export default ArticleView;
