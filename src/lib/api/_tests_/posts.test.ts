import {
  fetchAllPosts,
  fetchPostById,
  fetchPostsByCategory,
  fetchPostsBySearch,
} from "../posts";
import { Post } from "../../types/posts";

const mockPosts: Post[] = [
  { id: "1", title: "Test Post", content: "Content", publishedAt: "2025-01-01" } as Post,
  { id: "2", title: "Another Post", content: "Content", publishedAt: "2025-01-02" } as Post,
];

// Mock fetch globally
global.fetch = jest.fn();

describe("posts API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchAllPosts", () => {
    it("returns all posts on success", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: mockPosts }),
      });

      const posts = await fetchAllPosts();
      expect(posts).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/posts"),
        { cache: "no-store" }
      );
    });

    it("throws error on failed request", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchAllPosts()).rejects.toThrow("Failed to fetch post");
    });
  });

  describe("fetchPostById", () => {
    it("returns a post by id", async () => {
      const mockPost = mockPosts[0];
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPost,
      });

      const post = await fetchPostById("1");
      expect(post).toEqual(mockPost);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/posts/1"),
        { cache: "no-store" }
      );
    });

    it("throws error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchPostById("1")).rejects.toThrow("Failed to fetch post");
    });
  });

  describe("fetchPostsByCategory", () => {
    it("returns posts for a given category", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [mockPosts[1]] }),
      });

      const posts = await fetchPostsByCategory("cat123");
      expect(posts).toEqual([mockPosts[1]]);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("where[categories][equals]=cat123"),
        { cache: "no-store" }
      );
    });

    it("throws error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchPostsByCategory("cat123")).rejects.toThrow(
        "Failed to fetch posts by category"
      );
    });
  });

  describe("fetchPostsBySearch", () => {
    it("returns posts when search term is provided", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: [mockPosts[0]] }),
      });

      const posts = await fetchPostsBySearch("Test");
      expect(posts).toEqual([mockPosts[0]]);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("where[title][contains]=Test"),
        { cache: "no-store" }
      );
    });

    it("returns posts when no search term is provided", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ docs: mockPosts }),
      });

      const posts = await fetchPostsBySearch();
      expect(posts).toEqual(mockPosts);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/posts"),
        { cache: "no-store" }
      );
    });

    it("throws error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
      await expect(fetchPostsBySearch("fail")).rejects.toThrow(
        "Failed to fetch posts"
      );
    });
  });
});
