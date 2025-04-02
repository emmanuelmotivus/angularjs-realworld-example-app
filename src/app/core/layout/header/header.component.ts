import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';
import { AppConstants } from '../../config/app.constants';
import { User } from '../../models/user.model';

/**
 * AppHeaderComponent - Angular 12 implementation of the application header
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Replaced $scope.$watch with a subscription to the UserService's currentUser$ observable
 * - Implemented OnInit and OnDestroy lifecycle hooks for proper subscription management
 * - Added proper TypeScript typing for all properties
 * - Moved template to external HTML file as per Angular best practices
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Application name from constants
  appName: string;
  
  // Current logged in user
  currentUser: User | null = null;
  
  // Subscription to handle user changes
  private userSubscription: Subscription = new Subscription();

  constructor(
    private appConstants: AppConstants,
    private userService: UserService
  ) {
    this.appName = this.appConstants.appName;
  }

  /**
   * Initialize component and subscribe to user changes
   */
  ngOnInit(): void {
    // Get initial user state
    this.currentUser = this.userService.getCurrentUser();
    
    // Subscribe to user changes (replaces $scope.$watch)
    this.userSubscription = this.userService.currentUser$
      .subscribe(
        (newUser: User | null) => {
          this.currentUser = newUser;
        },
        error => {
          console.error('Error getting current user:', error);
        }
      );
  }

  /**
   * Clean up subscriptions when component is destroyed
   */
  ngOnDestroy(): void {
    // Prevent memory leaks by unsubscribing
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}