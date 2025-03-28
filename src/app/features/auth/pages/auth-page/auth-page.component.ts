import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { Errors } from '../../../../core/models/errors.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  // Form properties
  authForm: FormGroup;
  isSubmitting = false;
  authType = '';
  title = '';
  errors: Errors = {errors: {}};

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Create form group using FormBuilder
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the current route data to determine auth type (login/register)
    this.route.data.subscribe(data => {
      this.title = data.title;
      
      // Get auth type from the route path
      this.authType = this.router.url.includes('login') ? 'login' : 'register';
      
      // If this is register page, add username field
      if (this.authType === 'register') {
        this.authForm.addControl('username', this.fb.control('', Validators.required));
      }
    });
  }

  /**
   * Submit the authentication form
   * Replaces the original submitForm() method from AngularJS controller
   */
  submitForm(): void {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    // Get form values
    const credentials = this.authForm.value;
    
    // Call the user service for authentication
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        // Success callback
        () => {
          // Navigate to home page on successful authentication
          this.router.navigateByUrl('/');
        },
        // Error callback
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }
}