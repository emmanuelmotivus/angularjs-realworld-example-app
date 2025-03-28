import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Profile } from '../../../../core/models/profile.model';
import { UserService } from '../../../../core/services/user.service';
import { ProfileService } from '../../../../core/services/profile.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  toggleFollow() {
    this.isSubmitting = true;

    // Check if user is authenticated
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Redirect to login
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Follow this profile if we aren't currently
        if (!this.profile.following) {
          this.profileService.follow(this.profile.username)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            );

        // Unfollow this profile if we are currently
        } else {
          this.profileService.unfollow(this.profile.username)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            );
        }
      }
    );
  }
}