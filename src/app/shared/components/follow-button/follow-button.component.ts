import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ProfileService } from '../../../core/services/profile.service';
import { UserService } from '../../../core/services/user.service';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent implements OnInit {
  /**
   * The user profile to follow/unfollow
   * Converted from AngularJS '=' binding to Angular @Input()
   */
  @Input() user: Profile;
  
  /**
   * Tracks submission state to disable button during API calls
   */
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // No initialization needed, but implementing OnInit for future extensibility
  }

  /**
   * Handles the follow/unfollow action
   * - Redirects to register if user is not authenticated
   * - Toggles following status via API calls
   * - Uses RxJS operators for proper error handling and state management
   */
  submit(): void {
    this.isSubmitting = true;

    // Check if user is logged in
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    // If already following, unfollow
    if (this.user.following) {
      this.profileService.unfollow(this.user.username)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this.user.following = false;
          },
          // Error handling added (not present in original code)
          err => {
            console.error('Error unfollowing user', err);
          }
        );
    } else {
      // Otherwise, follow them
      this.profileService.follow(this.user.username)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this.user.following = true;
          },
          // Error handling added (not present in original code)
          err => {
            console.error('Error following user', err);
          }
        );
    }
  }
}