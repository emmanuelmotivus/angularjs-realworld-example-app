import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// AppConstants should be imported from wherever it's defined in the new Angular app
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root' // This makes the service available app-wide as a singleton
})
export class ProfileService {
  // Using Angular's dependency injection instead of 'ngInject'
  constructor(
    private appConstants: AppConstants,
    private http: HttpClient
  ) {}

  // Converting promise-based methods to return Observables
  get(username: string): Observable<any> {
    return this.http.get(
      `${this.appConstants.api}/profiles/${username}`
    ).pipe(
      map((response: any) => response.profile)
    );
  }

  follow(username: string): Observable<any> {
    return this.http.post(
      `${this.appConstants.api}/profiles/${username}/follow`,
      {}
    ).pipe(
      map((response: any) => response)
    );
  }

  unfollow(username: string): Observable<any> {
    return this.http.delete(
      `${this.appConstants.api}/profiles/${username}/follow`
    ).pipe(
      map((response: any) => response)
    );
  }
}