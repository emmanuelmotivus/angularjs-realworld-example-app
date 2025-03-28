import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to the currentUser Observable to update the UI when the user changes
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }
}