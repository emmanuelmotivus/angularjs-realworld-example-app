import { Profile } from './profile.model';

/**
 * Article model
 * 
 * Represents an article in the application
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
