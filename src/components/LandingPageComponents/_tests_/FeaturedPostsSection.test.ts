import React from "react";
import { render, screen } from "@testing-library/react";
import FeaturedPostsSection from "../FeaturedPostsSection";

jest.mock("../../../lib/api/posts", () => ({
  fetchAllPosts: jest.fn(),
}));

jest.mock("../../ui/CustomHeader", () => ({
  SectionHeader: ({ title }: { title: string }) =>
    React.createElement("h2", null, title),
}));

jest.mock("../../ui/FeatureCard", () => ({
  FeatureCard: ({ title, link, imageSrc }: any) =>
    React.createElement(
      "div",
      { "data-testid": "feature-card" },
      React.createElement("img", { src: imageSrc, alt: title }),
      React.createElement("a", { href: link }, title)
    ),
}));

describe("FeaturedPostsSection", () => {
  const { fetchAllPosts } = require("../../../lib/api/posts");

  const mockPosts = [
    {
      id: "1",
      title: "Post One",
      categories: { name: "Tech" },
      featuredImage: { url: "img1.jpg" },
    },
    {
      id: "2",
      title: "Post Two",
      categories: { name: "News" },
      featuredImage: null,
    },
    {
      id: "3",
      title: "Post Three",
      categories: { name: "Life" },
      featuredImage: { url: "img3.jpg" },
    },
    {
      id: "4",
      title: "Post Four",
      categories: { name: "Travel" },
      featuredImage: null,
    },
    {
      id: "5",
      title: "Post Five",
      categories: { name: "Misc" },
      featuredImage: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SectionHeader", async () => {
    fetchAllPosts.mockResolvedValue(mockPosts);
    render(await FeaturedPostsSection());
    expect(screen.getByText("Featured Blogs!")).toBeInTheDocument();
  });

  it("renders only 4 posts as FeatureCards", async () => {
    fetchAllPosts.mockResolvedValue(mockPosts);
    render(await FeaturedPostsSection());
    const cards = screen.getAllByTestId("feature-card");
    expect(cards).toHaveLength(4);
  });

  it("renders post with real image when featuredImage exists", async () => {
    fetchAllPosts.mockResolvedValue(mockPosts);
    render(await FeaturedPostsSection());
    expect(screen.getByAltText("Post One")).toHaveAttribute(
      "src",
      expect.stringContaining("img1.jpg")
    );
  });

  it("renders placeholder image when no featuredImage exists", async () => {
    fetchAllPosts.mockResolvedValue(mockPosts);
    render(await FeaturedPostsSection());
    expect(screen.getByAltText("Post Two")).toHaveAttribute(
      "src",
      "/placeholder.jpg"
    );
  });

  it("creates correct blog link using slugify", async () => {
    fetchAllPosts.mockResolvedValue(mockPosts);
    render(await FeaturedPostsSection());
    const link = screen.getByText("Post One").closest("a");
    expect(link).toHaveAttribute(
      "href",
      expect.stringMatching(/\/blogs\/tech\/post-one-1/)
    );
  });

  it("throws an error when fetchAllPosts rejects", async () => {
    fetchAllPosts.mockRejectedValue(new Error("Fetch failed"));

    await expect(FeaturedPostsSection()).rejects.toThrow("Fetch failed");
  });
});
