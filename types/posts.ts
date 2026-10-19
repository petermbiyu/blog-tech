export interface PostAuthor {
  name: string | null;
  image: string;
}
export interface PostProp {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  coverImageURL: string;
  createdAt: string;
  author: PostAuthor;
}
export interface FetchPostParams {
  pageParam?: string | null;
  limit?: number;
}
export interface FetchPostResponse {
  posts: PostProp[];
  nextCursor: number;
}
