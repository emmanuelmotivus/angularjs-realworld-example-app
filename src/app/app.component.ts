import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Import the AppConstants from the core module
// This assumes AppConstants has been migrated to a service in Angular
import { AppConstants } from './core/services/app-constants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // Page title property
  pageTitle = '';
  
  // Subscription to manage router events
  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private appConstants: AppConstants
  ) {}

  ngOnInit() {
    // Subscribe to router events to update page title based on route data
    this.routerSubscription = this.router.events.pipe(
      // Only proceed for NavigationEnd events
      filter(event => event instanceof NavigationEnd),
      // Get the activated route
      map(() => this.activatedRoute),
      // Navigate to the deepest activated route (child route)
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // Get the route's data
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // Set page title when route changes
      this.setPageTitle(data.title);
    });
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Helper method for setting the page's title
   * Replaces the AngularJS $rootScope.setPageTitle function
   * 
   * @param title - The title from the route data
   */
  setPageTitle(title: string): void {
    this.pageTitle = '';
    
    if (title) {
      this.pageTitle += title;
      this.pageTitle += ' \u2014 ';
    }
    
    this.pageTitle += this.appConstants.appName;
    
    // Update the browser's title bar using Angular's Title service
    this.titleService.setTitle(this.pageTitle);
  }
}