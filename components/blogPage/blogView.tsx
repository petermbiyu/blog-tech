"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { LuArrowLeft, LuPen, LuTrash } from "react-icons/lu";

interface PostPromiseProp {
  postPromise: Promise<{
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    coverImageURL: string;
    createdAt: string | Date;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  } | null>;
}

const BlogView = ({ postPromise }: PostPromiseProp) => {
  const post = use(postPromise);
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  return (
    <article className="max-w-3xl mx-auto py-20 px-6 ">
      {/* header  */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {post?.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 ">
          <span>By {post?.author.name}</span>
          <span>|</span>
          <span>
            {post?.createdAt &&
              new Date(post?.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          </span>
        </div>
      </header>
      {/* image */}
      <div className="relative w-full h-55 sm:h-80 lg:h-105 mb-12">
        {post?.coverImageURL && (
          <Image
            src={post?.coverImageURL}
            alt="cover image"
            className="object-cover rounded-2xl"
            fill
          />
        )}
      </div>
      {/* article content */}
      {post?.content && (
        <div
          className="max-w-none text-gray-400 leading-relaxed tracking-wide blog-post"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      )}

      <div className="border-t border-white/10 my-16" />
      {userId === post?.author.id && (
        <div className="flex items-center gap-2 justify-end">
          <Link
            href={"#"}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-indigo-400 border border-indigo-400/20 hover:border-indigo-400/40 hover:bg-indigo-400/10 transition-all"
          >
            <LuPen /> Edit
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-red-400 border border-red-400/20 hover:border-red-400/40 hover:bg-red-400/10 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            <LuTrash /> Delete
          </button>
        </div>
      )}
      <div className="mt-16 ">
        <Link
          href={"/articles"}
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <LuArrowLeft /> Back to all Articles
        </Link>
      </div>
    </article>
  );
};

export default BlogView;
