import { useDeletePost } from "@/custom-hooks/usePost";
import React from "react";
import toast from "react-hot-toast";
import { LuTrash } from "react-icons/lu";

const DeletePost = ({ postId }: { postId: string }) => {
  const { mutate: deletePostMutation, isPending } = useDeletePost();
  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this post");
    if (confirmed) {
      deletePostMutation(postId, {
        onSuccess: () => {
          toast("Article deleted successfully");
        },
      });
    }
  };
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-red-400 border border-red-400/20 hover:border-red-400/40 hover:bg-red-400/10 transition-all cursor-pointer disabled:cursor-not-allowed"
    >
      <LuTrash /> Delete
    </button>
  );
};

export default DeletePost;
