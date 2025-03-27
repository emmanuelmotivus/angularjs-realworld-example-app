// comments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(
    private appConstants: AppConstants,
    private http: HttpClient
  ) {}

  // Add a comment to an article
  add(slug: string, payload: string): Observable<any> {
    // Converted from promise to Observable
    return this.http.post(
      `${this.appConstants.api}/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(
      map((response: any) => response.comment)
    );
  }

  getAll(slug: string): Observable<any> {
    // Converted from promise to Observable
    return this.http.get(
      `${this.appConstants.api}/articles/${slug}/comments`
    ).pipe(
      map((response: any) => response.comments)
    );
  }

  destroy(commentId: string, articleSlug: string): Observable<any> {
    // Converted from promise to Observable
    return this.http.delete(
      `${this.appConstants.api}/articles/${articleSlug}/comments/${commentId}`
    );
  }
}