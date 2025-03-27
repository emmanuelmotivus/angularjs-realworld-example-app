// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html', // Assuming there's a corresponding template file
})
export class ProfileComponent implements OnInit {
  // Properties
  profile: any; // Type should be more specific based on your data model
  isUser: boolean = false;

  // Angular DI through constructor parameters instead of 'ngInject'
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Assuming profile data is passed via route resolver or input
    // If it was passed via route resolver, you would access it like:
    // this.route.data.subscribe(data => {
    //   this.profile = data.profile;
    //   this.checkIfCurrentUser();
    // });
    
    this.checkIfCurrentUser();
  }

  // Helper method to check if profile belongs to current user
  private checkIfCurrentUser(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      console.log(this.profile);
      this.isUser = (currentUser.username === this.profile.username);
    } else {
      this.isUser = false;
    }
  }
}