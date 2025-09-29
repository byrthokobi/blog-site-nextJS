/**
 * @jest-environment jsdom
 * @module NewestPostsSection.test
 *
 * This test file provides unit tests for the NewestPostsSection component.
 * It mocks external dependencies (data fetching, UI components) to test the component in isolation.
 *
 * NOTE: The component is an async React Server Component (RSC), so we await the component
 * function call before passing the resulting JSX tree to RTL's render function.
 */
import React from "react"; // Added explicit React import to resolve JSX scope issue in mocks
import { render, screen } from "@testing-library/react";
import NewestPostsSection from "@/components/LandingPageComponents/NewestPostsSection";

// --- Mock Data ---
const mockPosts = [
  {
    id: "1",
    title: "Introduction to Testing React Components",
    publishedAt: "2024-01-01",
    categories: { name: "Tech" },
    author: {
      firstName: "John",
      lastName: "Doe",
      avatar: { url: "/avatar1.jpg" },
    },
  },
  {
    id: "2",
    title: "The Future of Server Components",
    publishedAt: "2024-02-01",
    categories: { name: "NextJS" },
    author: { firstName: "Jane", lastName: "Smith", avatar: null }, // Test case for default avatar
  },
];

// --- Mock Dependencies ---

// 1. Mock the data fetching utility
// FIX: Initialize the mock function globally using const to resolve the hoisting/ReferenceError issue.
const mockFetchPostsBySearch = jest.fn();

// Mock the path based on your local environment (using relative path provided in error message)
jest.mock("../../../lib/api/posts", () => ({
  // FIX: Simply return the globally initialized function.
  fetchPostsBySearch: mockFetchPostsBySearch,
}));

// 2. Mock external components (SectionHeader, SearchBar, next/link)
jest.mock("../../ui/CustomHeader", () => ({
  // FIX: Using React.createElement for SectionHeader to bypass JSX compilation issues
  SectionHeader: ({ title }: { title: string }) =>
    React.createElement("h2", { "data-testid": "section-header" }, title),
}));

jest.mock("../../ui/SearchBar", () => ({
  // FIX: Using React.createElement for SearchBar to bypass JSX compilation issues
  __esModule: true,
  default: () =>
    React.createElement("input", {
      "data-testid": "search-bar",
      placeholder: "Search...",
    }),
}));

jest.mock("next/link", () => ({
  // FIX: Using React.createElement for next/link to bypass JSX compilation issues
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href: href }, children),
}));

// 3. Setup environment variable used for image URLs
process.env.BASE_URL = "https://mock.base.url";

describe("NewestPostsSection", () => {
  // Reset the mock and set a default successful implementation before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Set the mock return value here.
    mockFetchPostsBySearch.mockResolvedValue(mockPosts);
  });

  // Test Case 1: Renders and fetches posts with an empty query (default behavior)
  test("fetches posts with an empty query when no searchParams are provided", async () => {
    // Await the component execution as it is an async function (RSC)
    const Component = await NewestPostsSection({});
    render(Component);

    // Verify the data fetching function was called correctly
    expect(mockFetchPostsBySearch).toHaveBeenCalledWith("");

    // Verify static elements are rendered
    expect(screen.getByTestId("section-header")).toHaveTextContent(
      "Newest Blogs!"
    );
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Filter/i })).toBeInTheDocument();
  });

  // Test Case 2: Renders post data and results count correctly
  test("renders the post list and the correct total count", async () => {
    const Component = await NewestPostsSection({});
    render(Component);

    // Verify the results count based on mock data (2 posts)
    expect(
      screen.getByText(
        `Displaying ${mockPosts.length} of ${mockPosts.length} posts`
      )
    ).toBeInTheDocument();

    // Verify posts are rendered in the grid
    expect(screen.getAllByRole("article")).toHaveLength(mockPosts.length);

    // Verify content of the first post
    const post1Title = screen.getByRole("heading", {
      name: /Introduction to Testing React Components/i,
    });
    expect(post1Title).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Verify Link href for the first post
    expect(post1Title.closest("a")).toHaveAttribute("href", "/blog/Tech");
  });

  // Test Case 3: Handles a specific search query from props
  test("fetches posts using the query from searchParams", async () => {
    const searchTerm = "jest testing";
    const Component = await NewestPostsSection({
      searchParams: { query: searchTerm },
    });
    render(Component);

    // Verify the data fetching function was called with the specific query
    expect(mockFetchPostsBySearch).toHaveBeenCalledWith(searchTerm);
  });

  // Test Case 4: Handles empty results (No posts found)
  test("renders 0 results count when no posts are returned", async () => {
    mockFetchPostsBySearch.mockResolvedValue([]); // Mock empty response

    const Component = await NewestPostsSection({
      searchParams: { query: "nonexistent" },
    });
    render(Component);

    // Verify data fetching was called
    expect(mockFetchPostsBySearch).toHaveBeenCalledWith("nonexistent");

    // Verify the results count is 0
    expect(screen.getByText("Displaying 0 of 0 posts")).toBeInTheDocument();

    // Verify that no articles are rendered
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });

  // Test Case 5: Correctly handles author avatar rendering (with and without avatar URL)
  test("renders author avatar using BASE_URL or default path correctly", async () => {
    const Component = await NewestPostsSection({});
    render(Component);

    // Post 1 (with avatar URL)
    const post1Img = screen.getByAltText("John Doe");
    expect(post1Img).toHaveAttribute(
      "src",
      "https://mock.base.url/avatar1.jpg"
    );
    expect(post1Img).toHaveAttribute(
      "class",
      expect.stringContaining("rounded-full")
    );

    // Post 2 (without avatar URL, should use default)
    const post2Img = screen.getByAltText("Jane Smith");
    expect(post2Img).toHaveAttribute("src", "/default-avatar.png");
  });
});
