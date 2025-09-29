import { fetchAllCategories } from "@/lib/api/categories";

global.fetch = jest.fn();

describe("api/categories", () => {
  const mockCategories = [
    { id: "1", name: "Tech" },
    { id: "2", name: "Science" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BASE_URL = "https://payload-cms-blog-website-rtpq.vercel.app";
  });

  it("should return categories when response is ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockCategories }),
    });

    const result = await fetchAllCategories();
    expect(result).toEqual(mockCategories);
    expect(fetch).toHaveBeenCalledWith(
      "https://payload-cms-blog-website-rtpq.vercel.app/api/categories",
      { cache: "no-store" }
    );
  });

  it("should throw an error when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchAllCategories()).rejects.toThrow(
      "Failed to fetch categories"
    );
  });

  it("should return an empty array when docs is empty", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: [] }),
    });

    const result = await fetchAllCategories();
    expect(result).toEqual([]);
  });

  it("should work when BASE_URL is not set (fallback to empty string)", async () => {
    delete process.env.BASE_URL; // unset before import

    jest.resetModules(); // clear module cache
    const { fetchAllCategories } = await import("../categories"); // re-import fresh

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: [{ id: "1", name: "Fallback" }] }),
    });

    const result = await fetchAllCategories();
    expect(result).toEqual([{ id: "1", name: "Fallback" }]);
    expect(fetch).toHaveBeenCalledWith(
      "/api/categories", // ✅ now relative
      { cache: "no-store" }
    );
  });
});
