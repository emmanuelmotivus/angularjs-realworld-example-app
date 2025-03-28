import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { AppConstants } from '../../core/constants/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Properties
  appName: string;
  currentUser: User | null = null;
  
  // Subscription to manage and clean up when component is destroyed
  private userSubscription: Subscription = new Subscription();

  constructor(
    private appConstants: AppConstants,
    private userService: UserService
  ) {
    // Initialize app name from constants
    this.appName = this.appConstants.appName;
  }

  ngOnInit(): void {
    // Get initial user state
    this.currentUser = this.userService.getCurrentUser();
    
    // Subscribe to user changes (equivalent to $scope.$watch)
    this.userSubscription = this.userService.currentUser.subscribe(
      (userData: User | null) => {
        this.currentUser = userData;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed to prevent memory leaks
    this.userSubscription.unsubscribe();
  }
}