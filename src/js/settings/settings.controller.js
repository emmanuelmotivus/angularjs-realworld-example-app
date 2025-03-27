// settings.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html', // Assuming the template is in this location
  styleUrls: ['./settings.component.scss'] // Optional: add styles if needed
})
export class SettingsComponent implements OnInit {
  // Form data model
  formData: {
    email: string;
    bio: string;
    image: string;
    username: string;
  };

  // Form state
  isSubmitting = false;
  errors: any = {};

  constructor(
    private userService: UserService, // Angular DI instead of 'ngInject'
    private router: Router // Angular Router instead of $state
  ) {}

  ngOnInit(): void {
    // Initialize form data from current user
    // Moved from constructor to ngOnInit lifecycle hook
    this.formData = {
      email: this.userService.getCurrentUser().email,
      bio: this.userService.getCurrentUser().bio,
      image: this.userService.getCurrentUser().image,
      username: this.userService.getCurrentUser().username
    };
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.userService.update(this.formData).subscribe(
      // Using Observable subscribe instead of Promise then
      (user: User) => {
        // Navigate using Angular Router instead of $state.go
        this.router.navigate(['/profile', user.username]);
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors; // Updated error handling for Angular HttpClient
      }
    );
  }

  // Logout method
  logout(): void {
    this.userService.logout();
  }
}