"use client";
import EditPage from "@/skeletons/editPage";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useRef, useMemo, useEffect } from "react";
import { toast } from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Edit = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState<null | File>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { postId } = useParams();
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!title || !content || !excerpt) {
        console.log("Title, content & excerpt fields are required");
        toast("All fields are required", {
          style: { color: "white", background: "#1e3a8a" },
        });
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("excerpt", excerpt);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await axios.patch(`/api/posts/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data.success) {
        toast("Article published successfully");
        const slug = response.data.post.slug;
        router.replace(`/articles/${slug}`);
      }
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
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${postId}`);

        setContent(data.content);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setPreviewImg(data.coverImageURL);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios_error", error.response?.data);
          alert(error.response?.data?.error || "failed to load post");
        } else {
          console.error("Unknown_error", error);
          alert("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    if (postId) {
      fetchPost();
    }
  }, [postId]);
  if (loading) {
    return <EditPage />;
  }
  return (
    <section className="max-w-3xl py-20 mx-auto px-6">
      {/* page title */}
      <h1 className="text-3xl font-bold text-white mb-10">Edit your article</h1>
      <form onSubmit={handleSubmit}>
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
        {/* image preview */}
        <div className="my-8">
          <Image
            src={previewImg}
            alt="image preview"
            width={300}
            height={300}
            className="object-cover"
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
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
};

export default Edit;
