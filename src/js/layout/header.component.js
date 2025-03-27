// Import necessary Angular decorators and dependencies
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AppConstants } from '../config/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html' // Assuming the template path is updated
})
export class HeaderComponent implements OnInit {
  // Properties directly on the component class
  appName: string;
  currentUser: any;

  constructor(
    private appConstants: AppConstants,
    private userService: UserService
  ) {
    // Initialize properties in constructor
    this.appName = this.appConstants.appName;
    this.currentUser = this.userService.current;
  }

  ngOnInit() {
    // Subscribe to user changes instead of using $watch
    this.userService.currentUser.subscribe(
      (newUser) => {
        this.currentUser = newUser;
      }
    );
  }
}

// Note: The original export default AppHeader is no longer needed
// as Angular uses the @Component decorator and imports the component
// in the module declarations array