// auth.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  // Properties moved from controller to component
  title: string;
  authType: string;
  formData: any = {};
  isSubmitting = false;
  errors: any = null;
  authForm: FormGroup;

  // Angular DI through constructor parameters instead of 'ngInject'
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Get route info from Angular router instead of $state
    this.title = this.route.snapshot.data['title'];
    this.authType = this.route.snapshot.url[0].path;
  }

  ngOnInit() {
    // Optional: Initialize reactive form
    this.authForm = this.fb.group({
      email: '',
      password: ''
    });

    // Add username field if this is the register page
    if (this.authType === 'register') {
      this.authForm.addControl('username', this.fb.control(''));
    }
  }

  submitForm() {
    this.isSubmitting = true;
    
    // Use formData for backward compatibility
    // In a full upgrade, you would use this.authForm.value instead
    this.userService.attemptAuth(this.authType, this.formData).subscribe(
      (res) => {
        // Use Angular Router instead of $state
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors;
      }
    );
  }
}