import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Errors } from '../../core/models/errors.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // Form model for user settings
  settingsForm: FormGroup;
  
  // Current user data
  currentUser: User;
  
  // Form submission state
  isSubmitting = false;
  
  // Validation errors from the server
  errors: Errors = {} as Errors;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get the current user data
    this.currentUser = this.userService.getCurrentUser();
    
    // Initialize the form with current user data
    this.settingsForm = this.fb.group({
      email: [this.currentUser.email],
      bio: [this.currentUser.bio],
      image: [this.currentUser.image],
      username: [this.currentUser.username]
    });
  }

  /**
   * Submit the form to update user settings
   * Converted from AngularJS promise-based approach to RxJS Observable
   */
  submitForm(): void {
    this.isSubmitting = true;
    
    // Update the model
    this.updateUser(this.settingsForm.value);
    
    // Post the changes to the server
    this.userService.update(this.currentUser)
      .pipe(
        finalize(() => this.isSubmitting = false)
      )
      .subscribe(
        // Success callback
        (user: User) => {
          this.router.navigate(['/profile', user.username]);
        },
        // Error callback
        (err) => {
          this.errors = err.error.errors;
        }
      );
  }

  /**
   * Update the current user object with form values
   */
  updateUser(values: any): void {
    Object.assign(this.currentUser, values);
  }

  /**
   * Log the user out and redirect
   * Bound directly to the logout method in the UserService
   */
  logout(): void {
    this.userService.logout();
  }
}