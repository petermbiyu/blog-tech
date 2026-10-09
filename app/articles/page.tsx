import ContainerLayout from "@/layouts/containerLayout";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const posts = [
  {
    id: 1,
    title: "Is PHP really dead or is it a myth",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus laborum commodi harum explicabo ab quas assumenda reiciendis. Quo, saepe quos impedit corrupti aperiam enim eos voluptatem porro velit tempora commodi accusamus architecto fugit animi quod repudiandae voluptatum minima id at.",
    date: "sep 12, 2026",
    slug: "is-php-really-dead-or-is-it-a-myth",
    image: "/images/p1.png",
  },
  {
    id: 2,
    title: "Dark Mode Done Right in Tailwindcss",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus laborum commodi harum explicabo ab quas assumenda reiciendis. Quo, saepe quos impedit corrupti aperiam enim eos voluptatem porro velit tempora commodi accusamus architecto fugit animi quod repudiandae voluptatum minima id at.",
    date: "sep 25, 2026",
    slug: "dark-mode-done-right-in-tailwindcss",
    image: "/images/p2.png",
  },
  {
    id: 3,
    title: "WHy clean UI matter for blogs",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus laborum commodi harum explicabo ab quas assumenda reiciendis. Quo, saepe quos impedit corrupti aperiam enim eos voluptatem porro velit tempora commodi accusamus architecto fugit animi quod repudiandae voluptatum minima id at.",
    date: "sep 12, 2026",
    slug: "why-clean-UI-matter-for-blogs",
    image: "/images/p3.png",
  },
];

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
