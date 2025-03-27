// tags.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Import AppConstants from wherever it's defined in your new Angular structure
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class TagsService {
  
  constructor(
    private http: HttpClient,
    private appConstants: AppConstants
  ) {}

  // Converted to return an Observable instead of a Promise
  getAll(): Observable<string[]> {
    return this.http.get<{tags: string[]}>(
      `${this.appConstants.api}/tags`
    ).pipe(
      map(response => response.tags)
    );
  }
}