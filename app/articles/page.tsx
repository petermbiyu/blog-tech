import ContainerLayout from "@/layouts/containerLayout";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { posts } from "@/components/home/recentPosts";

const Articles = () => {
  return (
    <ContainerLayout>
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold">
          All Articles
        </h2>
        {/* cards */}
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
                    src={post.image}
                    alt={post.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                {/* content */}
                <div className="py space-y-3">
                  <time>{post.date}</time>
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
        <div className="flex justify-center mt-10 ">
          <button className="px-8 py-3 rounded-full bg-secondary-background text-gray-300 text-sm font-medium border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-pointer">
            Load more articles
          </button>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default Articles;
