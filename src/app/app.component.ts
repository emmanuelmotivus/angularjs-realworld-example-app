import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Import the AppConstants service 
import { AppConstants } from './core/services/app-constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  // Class property to store the page title
  pageTitle: string = '';
  
  // Subscription to manage router events
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private appConstants: AppConstants
  ) {}

  ngOnInit() {
    // Subscribe to router events to detect navigation changes
    // This replaces the $stateChangeSuccess event from AngularJS
    this.routerSubscription = this.router.events.pipe(
      // Only proceed for NavigationEnd events
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
      // Get the route data
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // Set the page title when route data changes
      this.setPageTitle(data.title);
    });
  }

  ngOnDestroy() {
    // Clean up subscriptions to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Helper method for setting the page's title
   * Migrated from AngularJS $rootScope.setPageTitle
   * 
   * @param title - The title to set for the current page
   */
  private setPageTitle(title?: string): void {
    let fullTitle = '';
    
    if (title) {
      fullTitle += title;
      fullTitle += ' \u2014 '; // Unicode em dash
    }
    
    fullTitle += this.appConstants.appName;
    
    // Update the class property
    this.pageTitle = fullTitle;
    
    // Also update the browser's title bar using Angular's Title service
    this.titleService.setTitle(fullTitle);
  }
}