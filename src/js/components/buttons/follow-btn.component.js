// follow-btn.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Import services - assuming these have been upgraded to Angular services
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html'
})
export class FollowBtnComponent {
  // Changed from bindings to @Input decorator
  @Input() user: any;
  
  isSubmitting = false;

  // Constructor injection instead of 'ngInject'
  constructor(
    private profileService: ProfileService, // renamed from _Profile
    private userService: UserService, // renamed from _User
    private router: Router // replaced _$state with Angular Router
  ) {}

  submit() {
    this.isSubmitting = true;

    // Check if user is logged in
    if (!this.userService.getCurrentUser()) {
      // Navigate using Angular Router instead of $state
      this.router.navigateByUrl('/register');
      return;
    }

    // If following already, unfollow
    if (this.user.following) {
      this.profileService.unfollow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = false;
        }
      );

    // Otherwise, follow them
    } else {
      this.profileService.follow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = true;
        }
      );
    }
  }
}