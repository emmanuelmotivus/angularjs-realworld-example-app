import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html'
})
export class AuthPageComponent implements OnInit {
  authType: string = '';
  title: string = '';
  errors: {[key: string]: string[]} = {};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the auth type from the current URL
    // Using router.url since that's more reliable than route.snapshot in lazy-loaded modules
    const url = this.router.url;
    this.authType = url.includes('login') ? 'login' : 'register';
    this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    
    // If this is the registration page, add username form control
    if (this.authType === 'register') {
      this.authForm.addControl('username', new FormControl('', Validators.required));
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    const credentials = this.authForm.value;
    
    // Convert string authType to the expected 'login' or 'register' type
    const authType = this.authType === 'login' ? 'login' : 'register';
    
    this.userService
    .attemptAuth(authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}