import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../core/models/profile.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Profile data received from the route resolver
  profile: Profile;
  
  // Flag to determine if the current user is viewing their own profile
  isUser: boolean = false;

  /**
   * Constructor with Angular dependency injection
   * 
   * @param route - ActivatedRoute to access route data (profile from resolver)
   * @param userService - Service to access current user information
   */
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  /**
   * Angular lifecycle hook that initializes the component
   * Replaces the AngularJS controller constructor logic
   */
  ngOnInit(): void {
    // Get profile data from the route resolver
    this.profile = this.route.snapshot.data['profile'];
    
    // Check if the current user is viewing their own profile
    const currentUser = this.userService.getCurrentUser();
    
    if (currentUser) {
      console.log(this.profile);
      this.isUser = (currentUser.username === this.profile.username);
    } else {
      this.isUser = false;
    }
  }
}