"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Write = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<null | File>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = useMemo(
    () => ({
      placeholder: "Start writing your article...",
      theme: "dark",
      style: {
        background: "#121212",
        color: "#d1d5dc",
      },
    }),
    [],
  );

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      if (!title || !content || !excerpt || !coverImage) {
        console.log("All fields are required");
        toast("All fields are required", {
          style: { color: "white", background: "#1e3a8a" },
        });
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("excerpt", excerpt);
      formData.append("coverImage", coverImage);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error, {
          style: { color: "white", background: "#1e3a8a" },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="max-w-3xl py-20 mx-auto px-6">
      {/* page title */}
      <h1 className="text-3xl font-bold text-white mb-10">
        Write a new article
      </h1>
      <form>
        {/* title  */}
        <input
          type="text"
          placeholder="Article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-4xl font-bold text-white placeholder-gray-400 outline-none mb-6"
        />
        {/* excerpt */}
        <textarea
          name="excerpt"
          placeholder="Write a short excerpt (1-2 sentences)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full bg-secondary-background p-4 mb-8 font-bold text-gray-200 placeholder-gray-500 rounded-xl resize-none border border-white/10 focus:border-indigo-500/50"
        ></textarea>
        {/* image upload */}
        <div className="mb-10">
          <label htmlFor="image" className="block text-gray-400 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:flle:bg-indigo-500"
          />
        </div>
        {/* editor */}
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-10 ">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <button className="px-6 py-3 rounded-full bg-primary cursor-pointer text-white font-semibold transition-colors">
          Publish
        </button>
      </form>
    </section>
  );
};

export default Write;
