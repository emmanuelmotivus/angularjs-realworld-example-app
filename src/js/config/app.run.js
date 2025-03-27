// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { AppConstants } from './app.constants';

// Convert to an Angular service with dependency injection
@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private appConstants: AppConstants
  ) {
    // Listen to router events instead of $stateChangeSuccess
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // Set page title based on route data
      if (data && data.title) {
        this.setPageTitle(data.title);
      }
    });
  }

  // Helper method for setting the page's title - now uses Angular's Title service
  setPageTitle(title: string): void {
    let pageTitle = '';
    if (title) {
      pageTitle += title;
      pageTitle += ' \u2014 ';
    }
    pageTitle += this.appConstants.appName;
    this.titleService.setTitle(pageTitle);
  }
}

// Export the service for use in the application
export default AppInitService;