import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Import the environment configuration that will replace AppConstants
import { environment } from '../../../environments/environment';

// Define interfaces for type safety
export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface CommentResponse {
  comment: Comment;
}

export interface CommentsResponse {
  comments: Comment[];
}

@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class CommentsService {
  // API URL from environment configuration
  private apiUrl = environment.api;

  /**
   * Constructor with Angular's dependency injection
   * Replaced AngularJS $http with Angular's HttpClient
   * Replaced AppConstants with environment configuration
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Add a comment to an article
   * @param slug - Article slug identifier
   * @param payload - Comment body text
   * @returns Observable of the created Comment
   */
  add(slug: string, payload: string): Observable<Comment> {
    return this.http.post<CommentResponse>(
      `${this.apiUrl}/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(
      map(response => response.comment),
      catchError(error => throwError(() => new Error(`Error adding comment: ${error.message}`)))
    );
  }

  /**
   * Get all comments for an article
   * @param slug - Article slug identifier
   * @returns Observable of Comment array
   */
  getAll(slug: string): Observable<Comment[]> {
    return this.http.get<CommentsResponse>(
      `${this.apiUrl}/articles/${slug}/comments`
    ).pipe(
      map(response => response.comments),
      catchError(error => throwError(() => new Error(`Error fetching comments: ${error.message}`)))
    );
  }

  /**
   * Delete a comment from an article
   * @param commentId - ID of the comment to delete
   * @param articleSlug - Article slug identifier
   * @returns Observable of the HTTP response
   */
  destroy(commentId: number, articleSlug: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/articles/${articleSlug}/comments/${commentId}`
    ).pipe(
      catchError(error => throwError(() => new Error(`Error deleting comment: ${error.message}`)))
    );
  }
}