import { CommentsResponse } from "@/lib/types/comments";

const BASE_URL = process.env.BASE_URL || "";

export async function fetchCommentsByPostId(postId: string): Promise<CommentsResponse> {
  const res = await fetch(`${BASE_URL}/api/comments?where[post][equals]=${postId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch comments");

  return res.json();
}
