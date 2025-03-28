import { Profile } from './profile.model';

/**
 * Comment model
 * 
 * Represents a comment on an article
 */
export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}
