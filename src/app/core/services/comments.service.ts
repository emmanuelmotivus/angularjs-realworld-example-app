import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiConfig } from '../config/api.config';
import { Comment, CommentsResponse, CommentResponse } from '../models/comment.model';

/**
 * Comments service handles all operations related to article comments
 */
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) {}

  /**
   * Get all comments for an article
   * 
   * @param slug Article slug
   * @returns Observable with array of comments
   */
  getAll(slug: string): Observable<Comment[]> {
    return this.http.get<CommentsResponse>(this.apiConfig.comments.get(slug))
      .pipe(
        map(response => response.comments),
        catchError(error => {
          console.error('Error fetching comments:', error);
          return throwError(() => new Error('Could not load comments'));
        })
      );
  }

  /**
   * Create a new comment for an article
   * 
   * @param slug Article slug
   * @param commentBody Comment content
   * @returns Observable with created comment
   */
  add(slug: string, commentBody: string): Observable<Comment> {
    return this.http.post<CommentResponse>(
      this.apiConfig.comments.create(slug),
      { comment: { body: commentBody } }
    ).pipe(
      map(response => response.comment),
      catchError(error => {
        console.error('Error adding comment:', error);
        return throwError(() => new Error('Could not add comment'));
      })
    );
  }

  /**
   * Delete a comment from an article
   * 
   * @param slug Article slug
   * @param commentId Comment ID to delete
   * @returns Observable with HTTP response
   */
  delete(slug: string, commentId: number): Observable<any> {
    return this.http.delete(this.apiConfig.comments.delete(slug, commentId))
      .pipe(
        catchError(error => {
          console.error('Error deleting comment:', error);
          return throwError(() => new Error('Could not delete comment'));
        })
      );
  }
}
