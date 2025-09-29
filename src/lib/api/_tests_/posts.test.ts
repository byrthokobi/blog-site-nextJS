// __tests__/api/posts.test.ts
import {
  fetchAllPosts,
  fetchPostById,
  fetchPostsByCategory,
  fetchPostsBySearch,
} from "@/lib/api/posts";
import { Post } from "@/lib/types/posts";

global.fetch = jest.fn();

describe("api/posts", () => {
  const mockPosts: Post[] = [
    { id: "1", title: "Post 1" } as Post,
    { id: "2", title: "Post 2" } as Post,
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BASE_URL = "https://payload-cms-blog-website-rtpq.vercel.app";
  });

  describe("fetchAllPosts", () => {
    it("should return posts when response is ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: mockPosts }),
      });

      const result = await fetchAllPosts();
      expect(result).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith(
        "https://payload-cms-blog-website-rtpq.vercel.app/api/posts",
        { cache: "no-store" }
      );
    });

    it("should throw an error when response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchAllPosts()).rejects.toThrow("Failed to fetch post");
    });

    it("should return empty array if docs is missing", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const result = await fetchAllPosts();
      expect(result).toEqual([]);
    });
  });

  describe("fetchPostById", () => {
    it("should return a single post when response is ok", async () => {
      const mockPost = { id: "1", title: "Post 1" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPost,
      });

      const result = await fetchPostById("1");
      expect(result).toEqual(mockPost);
      expect(fetch).toHaveBeenCalledWith(
        "https://payload-cms-blog-website-rtpq.vercel.app/api/posts/1",
        { cache: "no-store" }
      );
    });

    it("should throw an error when response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchPostById("1")).rejects.toThrow("Failed to fetch post");
    });
  });

  describe("fetchPostsByCategory", () => {
    it("should return posts for given category", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: mockPosts }),
      });

      const result = await fetchPostsByCategory("cat123");
      expect(result).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith(
        "https://payload-cms-blog-website-rtpq.vercel.app/api/posts?where[categories][equals]=cat123",
        { cache: "no-store" }
      );
    });

    it("should throw error if response not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchPostsByCategory("cat123")).rejects.toThrow(
        "Failed to fetch posts by category"
      );
    });

    it("should return empty array if docs missing", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const result = await fetchPostsByCategory("cat123");
      expect(result).toEqual([]);
    });
  });

  describe("fetchPostsBySearch", () => {
    it("should fetch posts with search term", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: mockPosts }),
      });

      const result = await fetchPostsBySearch("hello");
      expect(result).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith(
        "https://payload-cms-blog-website-rtpq.vercel.app/api/posts?where[title][contains]=hello",
        { cache: "no-store" }
      );
    });

    it("should fetch posts without search term", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: mockPosts }),
      });

      const result = await fetchPostsBySearch();
      expect(result).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith(
        "https://payload-cms-blog-website-rtpq.vercel.app/api/posts",
        { cache: "no-store" }
      );
    });

    it("should throw error when response not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchPostsBySearch("test")).rejects.toThrow(
        "Failed to fetch posts"
      );
    });

    it("should return empty array if docs missing", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      const result = await fetchPostsBySearch("test");
      expect(result).toEqual([]);
    });
  });
});
