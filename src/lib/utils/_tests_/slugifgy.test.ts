import { slugify } from "../slugify";

describe("slugify utility", () => {
  it("should convert text to a URL-friendly slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("should remove special characters", () => {
    expect(slugify("Next.js @ 2025")).toBe("nextjs-2025");
  });
});
