import { Author } from "./posts";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author?: Author;
}

export interface CommentsResponse {
  docs: Comment[];
}

export interface CommentUI {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar: string;
}