import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ProfileService } from '../../../../core/services/profile.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { Profile } from '../../../../core/models/profile.model';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  /**
   * The user profile to follow/unfollow
   * Converted from AngularJS '=' binding to Angular @Input()
   */
  @Input() user: Profile;
  
  /**
   * Flag to track submission state
   */
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Angular lifecycle hook for initialization
    // Replaces $onInit from AngularJS
  }

  /**
   * Handles the follow/unfollow action
   * Converted from AngularJS promise-based approach to RxJS observables with proper error handling
   */
  submit(): void {
    this.isSubmitting = true;

    // Check if user is authenticated
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    // Determine whether to follow or unfollow based on current state
    if (this.user.following) {
      // Unfollow user
      this.profileService.unfollow(this.user.username)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          (profile) => {
            this.user.following = false;
          },
          (error) => {
            // Handle error case - could add a toast notification here
            console.error('Failed to unfollow user', error);
          }
        );
    } else {
      // Follow user
      this.profileService.follow(this.user.username)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          (profile) => {
            this.user.following = true;
          },
          (error) => {
            // Handle error case - could add a toast notification here
            console.error('Failed to follow user', error);
          }
        );
    }
  }
}