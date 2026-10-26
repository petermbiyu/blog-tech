"use client";
import { useState } from "react";
import Modals from "./modals";
import { useModalStore } from "@/app/store/useModalStore";
import { useDebounce } from "@/custom-hooks/usePost";
import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "@/services/post";
import { PostProp } from "@/types/posts";
import { useRouter } from "next/navigation";

const SearchModel = () => {
  const { closeSearch, isSearchOpen } = useModalStore();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const router = useRouter();
  const {
    data: results = [],
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["search-posts", debouncedQuery],
    queryFn: () => searchPosts(debouncedQuery),
    enabled: debouncedQuery.length > 1, // prevent useless request
  });

  const handleNavigation = (slug: string) => {
    router.push(`/articles/${slug}`);
    closeSearch();
    setQuery("");
  };
  return (
    <Modals onClose={closeSearch} isOpen={isSearchOpen}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search Article"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white text-lg outline-none focus:border-indigo-500"
        />
        <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10 divide-y divide-white/10">
          {/* fetching results */}
          {(isLoading || isFetching) && (
            <div className="px-4 py-3 text-gray-400 text-sm">Searching...</div>
          )}
          {/* empty */}
          {!isLoading && !isFetching && results.length === 0 && (
            <div className="px-4 py-3 text-gray-400 text-sm">
              No results found!
            </div>
          )}
          {results.map((result: PostProp) => {
            return (
              <button
                key={result.id}
                onClick={() => handleNavigation(result.slug)}
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
