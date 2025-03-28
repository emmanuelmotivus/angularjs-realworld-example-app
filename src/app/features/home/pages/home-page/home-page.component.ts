import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// Import services
import { UserService } from '../../../../core/services/user.service';
import { TagsService } from '../../../../core/services/tags.service';
import { ArticleListConfig } from '../../../../core/models/article-list-config.model';
import { ArticleListComponent } from '../../components/article-list/article-list.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // Application name from constants
  appName: string;
  
  // Tags related properties
  tags: string[] = [];
  tagsLoaded = false;
  
  // Article list configuration
  listConfig: ArticleListConfig = {};
  
  /**
   * Constructor with Angular dependency injection
   * Replaces AngularJS 'ngInject' with proper Angular DI
   */
  constructor(
    private userService: UserService,
    private tagsService: TagsService
  ) {
    // Get app name from constants (now injected via environment or app config)
    this.appName = 'conduit'; // This would come from an AppConfig service in a real app
  }
  
  /**
   * Angular lifecycle hook that replaces the constructor logic from AngularJS
   * Initializes component data and loads tags
   */
  ngOnInit(): void {
    // Get list of all tags - converted from promise to Observable
    this.tagsService.getAll()
      .pipe(take(1))
      .subscribe(
        (tags: string[]) => {
          this.tagsLoaded = true;
          this.tags = tags;
        },
        err => {
          this.tagsLoaded = true;
          console.error('Error loading tags', err);
        }
      );
    
    // Set current list to either feed or all, depending on auth status
    // Using the user service to check if user is authenticated
    this.listConfig = {
      type: this.userService.getCurrentUser() ? 'feed' : 'all'
    };
  }
  
  /**
   * Changes the current article list type
   * Replaces the $scope.$broadcast with direct component interaction
   * 
   * @param newList - The new list type to display
   */
  changeList(newList: string): void {
    // In Angular, we don't use $scope.$broadcast
    // Instead, we update the listConfig property directly
    // The article-list component will react to this change via @Input binding
    this.listConfig = { type: newList };
    
    // Note: In a more complex scenario, we might use a shared service with
    // BehaviorSubject/Observable pattern or the EventEmitter to communicate
    // between components that aren't directly related
  }
}