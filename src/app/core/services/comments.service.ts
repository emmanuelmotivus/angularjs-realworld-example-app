import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiConfig } from '../config/api.config';
import { Comment, CommentsResponse, CommentResponse } from '../models/comment.model';
import { MockArticlesService } from './mock/mock-articles.service';

/**
 * Comments service handles all operations related to article comments
 */
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private mockArticlesService: MockArticlesService
  ) {}

  /**
   * Get all comments for an article
   * 
   * @param slug Article slug
   * @returns Observable with array of comments
   */
  getAll(slug: string): Observable<Comment[]> {
    console.log('CommentsService.getAll called with slug:', slug);
    
    // Use mock data instead of HTTP request
    const comments = this.mockArticlesService.getComments(slug);
    return of(comments as Comment[]);
    
    /* Original HTTP implementation
    return this.http.get<CommentsResponse>(this.apiConfig.comments.get(slug))
      .pipe(
        map(response => response.comments),
        catchError(error => {
          console.error('Error fetching comments:', error);
          return throwError(() => new Error('Could not load comments'));
        })
      );
    */
  }

  /**
   * Create a new comment for an article
   * 
   * @param slug Article slug
   * @param commentBody Comment content
   * @returns Observable with created comment
   */
  add(slug: string, commentBody: string): Observable<Comment> {
    console.log('CommentsService.add called with slug:', slug, 'and body:', commentBody);
    
    // Create a mock comment
    const newComment = {
      id: Date.now(), // Use timestamp as a unique ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      body: commentBody,
      author: {
        username: 'current-user',
        bio: 'A mock user',
        image: 'https://res.cloudinary.com/dmela7d4j/image/upload/v1743170698/nick_gdf8ru.jpg',
        following: false
      }
    };
    
    return of(newComment as Comment);
    
    /* Original HTTP implementation
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
    */
  }

  /**
   * Delete a comment from an article
   * 
   * @param slug Article slug
   * @param commentId Comment ID to delete
   * @returns Observable with HTTP response
   */
  delete(slug: string, commentId: number): Observable<any> {
    console.log('CommentsService.delete called with slug:', slug, 'and commentId:', commentId);
    
    // Just return a success response
    return of({ success: true });
    
    /* Original HTTP implementation
    return this.http.delete(this.apiConfig.comments.delete(slug, commentId))
      .pipe(
        catchError(error => {
          console.error('Error deleting comment:', error);
          return throwError(() => new Error('Could not delete comment'));
        })
      );
    */
  }
}
