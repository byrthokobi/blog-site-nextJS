import { Post, SinglePostUI } from "@/lib/types/posts";

const BASE_URL = process.env.BASE_URL ?? "";

export function mapSinglePost(post: Post, category: string): SinglePostUI {
  const title = post.title;
  const publishedAt = new Date(post.publishedAt).toLocaleDateString();
  const categoryName = category.toUpperCase();
  const content = post.content?.root?.children?.[0]?.children?.[0]?.text ?? "";

  const featuredImage = post.featuredImage
    ? `${BASE_URL}${post.featuredImage.url}`
    : "/placeholder.jpg";

  const authorName = `${post.author?.firstName ?? ""} ${
    post.author?.lastName ?? ""
  }`.trim();

  const authorAvatar = post.author?.avatar
    ? `${BASE_URL}${post.author.avatar.url}`
    : "/default-avatar.png";

  return {
    title,
    publishedAt,
    categoryName,
    content,
    featuredImage,
    authorName,
    authorAvatar,
  };
}
