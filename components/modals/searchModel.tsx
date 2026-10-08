"use client";
import Modals from "./modals";
import { useModalStore } from "@/app/store/useModalStore";

const results = [
  {
    id: 1,
    title: "Building a Medium-Style Blog with NextJS",
    slug: "/articles/medium-style-blog",
  },
  {
    id: 2,
    title: "Dark Mode Done Right in Tailwind",
    slug: "/articles/dark-mode-tailwind",
  },
];

const SearchModel = () => {
  const { closeSearch, isSearchOpen } = useModalStore();
  return (
    <Modals onClose={closeSearch} isOpen={isSearchOpen}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search Article"
          autoFocus
          className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white text-lg outline-none focus:border-indigo-500"
        />
        <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10 divide-y divide-white/10">
          {results.map((result) => {
            return (
              <button
                key={result.id}
                className="w-full text-left px-4 py-3 text-gray-300 transition hover:bg-whote/5 hover:text-white cursor-pointer"
              >
                {result.title}
              </button>
            );
          })}
        </div>
      </div>
    </Modals>
  );
};

export default SearchModel;
