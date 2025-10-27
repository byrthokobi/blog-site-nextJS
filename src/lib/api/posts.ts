import { Post } from "../types/posts";

const url = process.env.BASE_URL;

export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${url}/api/posts`, {
      next: { revalidate: 3600, tags: ["posts"] },
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error("Error in fetchAllPosts:", error);
    return [];
  }
}

export async function fetchPostById(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${url}/api/posts/${id}`, {
      next: { revalidate: 3600, tags: ["posts"] },
    });

    if (!res.ok) throw new Error("Failed to fetch post");
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.error(`Error in fetchPostById(${id}):`, error);
    return null;
  }
}

export async function fetchPostsByCategory(
  categoryId: string
): Promise<Post[]> {
  try {
    const res = await fetch(
      `${url}/api/posts?where[categories][equals]=${categoryId}`,
      { next: { revalidate: 3600, tags: ["posts"] } }
    );

    if (!res.ok) throw new Error("Failed to fetch posts by category");

    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Error in fetchPostsByCategory(${categoryId}):`, error);
    return [];
  }
}

export async function fetchPostsBySearch(searchTerm?: string): Promise<Post[]> {
  try {
    const query = searchTerm
      ? `?where[title][contains]=${encodeURIComponent(searchTerm)}`
      : "";

    const res = await fetch(`${url}/api/posts${query}`, {
      next: { revalidate: 3600, tags: ["posts"] },
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Error in fetchPostsBySearch("${searchTerm}")`, error);
    return [];
  }
}
