// profile-articles.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html'
})
export class ProfileArticlesComponent implements OnInit {
  // The profile for this page, resolved by Angular Router
  profile: any;
  profileState: string;
  listConfig: any = { type: 'all' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Get profile from route data
    this.profile = this.route.snapshot.data['profile'];
    
    // Get current route path to determine state
    // Equivalent to the old $state.current.name
    const url = this.router.url;
    this.profileState = url.includes('/favorites') ? 'favorites' : 'main';

    // Configure list based on profile state
    // `main` state's filter should be by author
    if (this.profileState === 'main') {
      this.listConfig.filters = {author: this.profile.username};
      // Set page title - using Angular Title service instead of $rootScope
      this.titleService.setTitle('@' + this.profile.username);

    } else if (this.profileState === 'favorites') {
      this.listConfig.filters = {favorited: this.profile.username};
      // Set page title
      this.titleService.setTitle(`Articles favorited by ${this.profile.username}`);
    }
  }
}