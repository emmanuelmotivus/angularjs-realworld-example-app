import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { finalize } from 'rxjs/operators';

/**
 * AuthComponent handles user authentication (login/register)
 * 
 * Migration notes:
 * - Converted from AngularJS controller to Angular component
 * - Replaced $state with Angular Router
 * - Added reactive form handling
 * - Converted promise-based API calls to Observable with RxJS operators
 * - Added proper TypeScript interfaces and typing
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  // Form properties
  authForm: FormGroup;
  authType: string = '';
  title: string = '';
  isSubmitting: boolean = false;
  errors: {[key: string]: string} = {};
  
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Create the form group with validators
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the auth type from the route data
    this.route.data.subscribe(data => {
      this.title = data.title;
    });

    // Get the auth type from the current route
    // Equivalent to $state.current.name.replace('app.', '')
    this.authType = this.router.url.split('/')[1]; // 'login' or 'register'
    
    // Add username field if this is the register page
    if (this.authType === 'register') {
      this.authForm.addControl('username', this.fb.control('', Validators.required));
    }
  }

  /**
   * Submit the authentication form
   * Handles both login and registration
   */
  submitForm(): void {
    this.isSubmitting = true;
    this.errors = {};
    
    // Get the form values
    const credentials = this.authForm.value;
    
    // Attempt authentication with the service
    this.userService.attemptAuth(this.authType, credentials)
      .pipe(
        finalize(() => this.isSubmitting = false)
      )
      .subscribe(
        // Success callback
        () => {
          // Navigate to home page on successful authentication
          this.router.navigateByUrl('/');
        },
        // Error callback
        err => {
          this.errors = err.error.errors || {};
        }
      );
  }
}