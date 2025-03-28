import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

/**
 * Title Service
 * 
 * This service replaces the AngularJS AppRun functionality that managed page titles.
 * In Angular, we use the Title service from @angular/platform-browser instead of $rootScope
 * and subscribe to router events instead of $stateChangeSuccess.
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class TitleService {
  private readonly appName: string;

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // In Angular, we inject configuration values rather than using AppConstants
    // This would typically come from an environment file or a configuration service
    this.appName = 'Conduit'; // Default app name, replace with actual app name from config

    // Initialize the router event listener to replace $stateChangeSuccess
    this.initRouterListener();
  }

  /**
   * Initialize router event listener to detect route changes
   * This replaces the $rootScope.$on('$stateChangeSuccess') from AngularJS
   */
  private initRouterListener(): void {
    this.router.events.pipe(
      // Filter only NavigationEnd events (equivalent to $stateChangeSuccess)
      filter(event => event instanceof NavigationEnd),
      // Get the activated route
      map(() => this.activatedRoute),
      // Navigate to the deepest route
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // Get route data
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // Set page title based on route data (equivalent to toState.title)
      this.setPageTitle(data.title);
    });
  }

  /**
   * Sets the page title
   * Replaces the $rootScope.setPageTitle function from AngularJS
   * 
   * @param title - The page-specific part of the title
   */
  public setPageTitle(title?: string): void {
    let pageTitle = '';
    
    if (title) {
      pageTitle += title;
      pageTitle += ' \u2014 '; // Unicode em dash
    }
    
    pageTitle += this.appName;
    
    // Use Angular's Title service instead of setting $rootScope.pageTitle
    this.titleService.setTitle(pageTitle);
  }
}