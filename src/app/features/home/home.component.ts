import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Import services and models
import { UserService } from '../../core/services/user.service';
import { TagsService } from '../../core/services/tags.service';
import { AppConstants } from '../../core/constants/app.constants';
import { User } from '../../core/models/user.model';
import { ListConfig } from '../../core/models/list-config.model';

/**
 * HomeComponent - Angular component that replaces the AngularJS HomeCtrl
 * 
 * Migration notes:
 * - Converted from AngularJS controller class to Angular @Component
 * - Replaced $scope broadcast with an EventEmitter or direct property binding
 * - Converted promise-based API calls to Observable pattern with RxJS
 * - Added proper TypeScript types to all properties and methods
 * - Implemented OnInit lifecycle hook instead of constructor initialization
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Application name from constants
  appName: string = this.appConstants.appName;
  
  // Tags data
  tags: string[] = [];
  tagsLoaded: boolean = false;
  
  // List configuration
  listConfig: ListConfig;
  
  // Current user
  currentUser: User | null;

  /**
   * Constructor with dependency injection
   * Angular DI replaces AngularJS 'ngInject' annotation
   */
  constructor(
    private userService: UserService,
    private tagsService: TagsService,
    private appConstants: AppConstants
  ) {
    // Initialize listConfig based on authentication status
    this.currentUser = this.userService.getCurrentUser();
    this.listConfig = {
      type: this.currentUser ? 'feed' : 'all'
    };
  }

  /**
   * Angular lifecycle hook that initializes the component
   * Replaces initialization logic from AngularJS constructor
   */
  ngOnInit(): void {
    // Load tags when component initializes
    this.loadTags();
  }

  /**
   * Load all tags using the TagsService
   * Converted from promise-based approach to Observable with error handling
   */
  loadTags(): void {
    this.tagsService.getAll().pipe(
      tap((tags: string[]) => {
        this.tags = tags;
        this.tagsLoaded = true;
      }),
      catchError(error => {
        console.error('Error loading tags', error);
        this.tagsLoaded = true;
        return of([]);
      })
    ).subscribe();
  }

  /**
   * Change the current article list type
   * Replaces $scope.$broadcast with a more Angular-appropriate approach
   * 
   * @param newList - The new list type to display
   */
  changeList(newList: string): void {
    this.listConfig = { type: newList };
    
    // Note: In a real implementation, we would use one of these approaches:
    // 1. Use a shared service with BehaviorSubject to communicate between components
    // 2. Use @Input/@Output with EventEmitter if parent-child relationship
    // 3. Use a state management solution like NgRx
    
    // For this migration, we're assuming the list component is a child of this component
    // and will receive the updated listConfig via @Input binding
  }
}