import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { Errors } from '../../../../core/models/errors.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  // Form model for user settings
  settingsForm: FormGroup;
  
  // User data model
  user: User = {} as User;
  
  // Form submission state
  isSubmitting = false;
  
  // Validation errors from API
  errors: Errors = { errors: {} };

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Make a copy of the current user's data for the form
    this.user = this.userService.getCurrentUser();
    
    // Initialize the form with current user data
    this.settingsForm = this.fb.group({
      email: [this.user.email],
      bio: [this.user.bio],
      image: [this.user.image],
      username: [this.user.username],
      password: [''] // Optional field for changing password
    });
  }

  /**
   * Submit the form to update user settings
   * Equivalent to the submitForm method in the original controller
   */
  submitForm(): void {
    this.isSubmitting = true;
    
    // Update the model
    this.updateUser(this.settingsForm.value);
    
    // Post the changes to the API
    this.userService.update(this.user)
      .pipe(
        finalize(() => this.isSubmitting = false)
      )
      .subscribe(
        // Success callback
        (updatedUser: User) => {
          this.router.navigate(['/profile', updatedUser.username]);
        },
        // Error callback
        (err) => {
          this.errors = err;
        }
      );
  }

  /**
   * Log the user out and redirect to home page
   */
  logout(): void {
    this.userService.logout();
  }

  /**
   * Update the user object with form values
   * @param formValues Values from the form
   */
  private updateUser(formValues: any): void {
    // Only update password if provided
    if (formValues.password) {
      this.user.password = formValues.password;
    }
    
    this.user.email = formValues.email;
    this.user.bio = formValues.bio;
    this.user.image = formValues.image;
    this.user.username = formValues.username;
  }
}