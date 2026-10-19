import { PostProp } from "@/types/posts";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const RecentPosts = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/posts/recent`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch recent posts");
  }
  const { posts }: { posts: PostProp[] } = await response.json();

  return (
    <div className="space-y-2 mb-10">
      <h2 className="text-white text-xl mb-10 sm:text-2xl md:text-3xl font-semibold ">
        Recent Posts
      </h2>
      {/* post cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className="group rounded-xl overflow-hidden bg-[#0B0B0B] border pb-5 border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              {/* image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.coverImageURL}
                  alt={post.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              {/* content */}
              <div className="py space-y-3">
                <time className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <h2 className="text-lg font-semibold text-white leading-snug group-hover:text-indigo-400 transition-colors ">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`articles/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:underline"
                >
                  Read Article <LuArrowRight />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPosts;
