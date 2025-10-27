import { Category } from "@/lib/types/categories";

const url = process.env.BASE_URL || "";

export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${url}/api/categories`, {
      next: { revalidate: 3600, tags: ["categories"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();

    return data.docs.map((cat: { id: string; name: string }) => ({
      id: cat.id,
      name: cat.name,
    }));
  } catch (error) {
    console.error("Error in fetchAllCategories:", error);
    return [];
  }
}
