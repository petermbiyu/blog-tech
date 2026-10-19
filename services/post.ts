import { FetchPostParams, FetchPostResponse } from "@/types/posts";
import axios from "axios";

export async function fetchPosts({
  pageParam,
  limit,
}: FetchPostParams): Promise<FetchPostResponse> {
  const response = await axios.get("api/posts", {
    params: {
      cursor: pageParam,
      limit,
    },
  });
  return response.data;
}
