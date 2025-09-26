import { fetchCommentsByPostId } from "@/lib/api/comments";
import { CommentUI } from "@/lib/types/comments";

const url = process.env.BASE_URL || "";

export async function getCommentsForPost(postId: string): Promise<CommentUI[]> {
  const commentsData = await fetchCommentsByPostId(postId);

  return commentsData.docs.map((c) => ({
    id: c.id,
    author: `${c.author?.firstName ?? "Anonymous"} ${c.author?.lastName ?? ""}`.trim(),
    content: c.content,
    createdAt: new Date(c.createdAt).toLocaleString(),
    avatar: c.author?.avatar?.url
      ? `${url}${c.author.avatar.url}`
      : "/default-avatar.png",
  }));
}
