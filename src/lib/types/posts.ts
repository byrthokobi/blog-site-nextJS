export interface Author {
  firstName?: string;
  lastName?: string;
  avatar?: {
    url: string;
  };
}

export interface Post {
  id: string;
  title: string;
  publishedAt: string;
  content?: {
    root?: {
      children?: {
        children?: { text?: string }[];
      }[];
    };
  };
  featuredImage?: { url: string };
  categories?: {name?: string};
  author?: Author;
}


export interface SinglePostUI {
  title: string;
  publishedAt: string;
  categoryName: string;
  content: string;
  featuredImage: string;
  authorName: string;
  authorAvatar: string;
}
