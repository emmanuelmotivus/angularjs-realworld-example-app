// home.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TagsService } from '../services/tags.service';
import { AppConstants } from '../config/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Public properties that will be accessible in the template
  appName: string;
  tagsLoaded: boolean = false;
  tags: any[] = [];
  listConfig: any = {};

  // Angular uses dependency injection through the constructor
  // No need for 'ngInject' as Angular handles DI through TypeScript types
  constructor(
    private userService: UserService,
    private tagsService: TagsService,
    private appConstants: AppConstants
  ) {
    this.appName = this.appConstants.appName;
  }

  // Lifecycle hook that runs after component is initialized
  // Replaces logic that was in the constructor
  ngOnInit() {
    // Get list of all tags
    this.tagsService.getAll()
      .subscribe(tags => {
        this.tagsLoaded = true;
        this.tags = tags;
      });

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: this.userService.getCurrentUser() ? 'feed' : 'all'
    };
  }

  // Method to change the current list
  // Instead of using $scope.$broadcast, we'll use a service or Input/Output
  changeList(newList: string) {
    // In Angular, we would typically use a service with an Observable
    // or use @Output EventEmitter to communicate with child components
    // For now, we'll keep the method signature the same
    // but implementation would need to be updated based on the new architecture
    this.listConfig.type = newList;
  }
}