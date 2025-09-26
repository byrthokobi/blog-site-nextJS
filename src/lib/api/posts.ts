import { Post } from "../types/posts";

const url = process.env.BASE_URL;


export async function fetchAllPosts(): Promise<Post[]> {
    const res = await fetch(`${url}/api/posts`, { cache: "no-store" });
    
    if (!res.ok) throw new Error("Failed to fetch post");
    
    const data = await res.json();
    return data.docs || [];
}

export async function fetchPostById(id: string): Promise<Post> {
  const res = await fetch(`${url}/api/posts/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}


export async function fetchPostsByCategory(categoryId: string): Promise<Post[]> {
  const res = await fetch(
    `${url}/api/posts?where[categories][equals]=${categoryId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch posts by category");

  const data = await res.json();
  return data.docs || [];
}


export async function fetchPostsBySearch(searchTerm?: string): Promise<Post[]> {
  const query = searchTerm
    ? `?where[title][contains]=${encodeURIComponent(searchTerm)}`
    : "";

  const res = await fetch(`${url}/api/posts${query}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch posts");

  const data = await res.json();
  return data.docs || [];
}
