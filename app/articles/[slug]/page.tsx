import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuArrowLeft, LuPen, LuTrash } from "react-icons/lu";

const ArticleView = () => {
  return (
    <article className="max-w-3xl mx-auto py-20 px-6 ">
      {/* header  */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          Build a Medium-Style Blog with NextJS{" "}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 ">
          <span>By Peter Smasha</span>
          <span>|</span>
          <span>Sep 12, 2026</span>
        </div>
      </header>
      {/* image */}
      <div className="relative w-full h-55 sm:h-80 lg:h-105 mb-12">
        <Image
          src={"/images/p1.png"}
          alt="cover image"
          className="object-cover rounded-2xl"
          fill
        />
      </div>
      {/* article content */}
      <div className="max-w-none text-gray-400 leading-relaxed tracking-wide">
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eum
          dolor unde at porro? Aliquid vero, voluptatibus doloremque magnam
          similique autem officiis reiciendis provident, deleniti dignissimos
          nam, omnis aut. Voluptatibus placeat numquam assumenda cupiditate
          minima dolores exercitationem incidunt totam nostrum, suscipit ad
          expedita, facere laborum voluptate quis itaque perferendis quo
          explicabo adipisci enim odit ab dolorum? Reiciendis hic suscipit
          nostrum iure? Ad quod magnam ipsa, harum deserunt fugiat odit iste
          facilis corrupti expedita non minima quam sunt libero at! Quo
          consequatur vero tempore, mollitia ipsa voluptatem accusamus alias
          quam deleniti vitae libero voluptas! Dolorem sapiente error, ab iure
          libero aliquam.
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eum
          dolor unde at porro? Aliquid vero, voluptatibus doloremque magnam
          similique autem officiis reiciendis provident, deleniti dignissimos
          nam, omnis aut. Voluptatibus placeat numquam assumenda cupiditate
          minima dolores exercitationem incidunt totam nostrum, suscipit ad
          expedita, facere laborum voluptate quis itaque perferendis quo
          explicabo adipisci enim odit ab dolorum? Reiciendis hic suscipit
          nostrum iure?
        </p>
        <p className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eum
          dolor unde at porro? Aliquid vero, voluptatibus doloremque magnam
          similique autem officiis reiciendis provident, deleniti dignissimos
          nam, omnis aut. Voluptatibus placeat numquam assumenda cupiditate
          minima dolores exercitationem incidunt totam nostrum, suscipit ad
          expedita, facere laborum voluptate quis itaque perferendis quo
          explicabo adipisci enim odit ab dolorum? Reiciendis hic suscipit
          nostrum iure? Ad quod magnam ipsa, harum deserunt fugiat odit iste
          facilis corrupti expedita non minima quam sunt libero at! Quo
          consequatur vero tempore, mollitia ipsa voluptatem accusamus alias
          quam deleniti vitae libero voluptas! Dolorem sapiente error, ab iure
          libero aliquam.
        </p>
      </div>
      <div className="border-t border-white/10 my-16" />
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
          {" "}
          <LuTrash /> Delete
        </button>
      </div>
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

export default ArticleView;
