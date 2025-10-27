import { CommentsResponse } from "@/lib/types/comments";

const BASE_URL = process.env.BASE_URL || "";

export async function fetchCommentsByPostId(
  postId: string
): Promise<CommentsResponse> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/comments?where[post][equals]=${postId}`,
      {
        next: { revalidate: 3600, tags: ["comments"] },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in fetchCommentsByPostId(${postId}):`, error);
    return { docs: [] };
  }
}
