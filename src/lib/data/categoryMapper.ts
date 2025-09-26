import { fetchAllCategories } from "@/lib/api/categories";
import { CategoryUI } from "@/lib/types/categories";
import { slugify } from "@/lib/utils/slugify";

let cachedCategories: CategoryUI[] | null = null;

export async function loadCategories(): Promise<CategoryUI[]> {
  if (!cachedCategories) {
    const rawCategories = await fetchAllCategories();
    cachedCategories = rawCategories.map((c) => ({
      id: c.id,
      categoryName: c.name,
      slug: slugify(c.name),
    }));
  }
  return cachedCategories;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryUI | undefined> {
  const categories = await loadCategories();
  return categories.find((cat) => cat.slug === slug);
}
