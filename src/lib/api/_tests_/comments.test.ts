import { CommentsResponse } from "@/lib/types/comments";

global.fetch = jest.fn();

describe("api/comments", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BASE_URL = "https://payload-cms-blog-website-rtpq.vercel.app";
  });

  it("should return comments when response is ok", async () => {
    const mockResponse: CommentsResponse = {
      docs: [
        { id: "c1", content: "Great post!" },
        { id: "c2", content: "Nice work" },
      ],
    } as CommentsResponse;

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // import after env is set
    const { fetchCommentsByPostId } = await import("@/lib/api/comments");

    const result = await fetchCommentsByPostId("123");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://payload-cms-blog-website-rtpq.vercel.app/api/comments?where[post][equals]=123",
      { cache: "no-store" }
    );
  });

  it("should throw an error when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const { fetchCommentsByPostId } = await import("@/lib/api/comments");

    await expect(fetchCommentsByPostId("123")).rejects.toThrow(
      "Failed to fetch comments"
    );
  });

  it("should work with BASE_URL unset (fallback to relative)", async () => {
    delete process.env.BASE_URL;
    jest.resetModules(); // force re-import with BASE_URL=""

    const { fetchCommentsByPostId } = await import("@/lib/api/comments");

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: [] }),
    });

    const result = await fetchCommentsByPostId("456");
    expect(result).toEqual({ docs: [] });
    expect(fetch).toHaveBeenCalledWith(
      "/api/comments?where[post][equals]=456",
      { cache: "no-store" }
    );
  });
});
