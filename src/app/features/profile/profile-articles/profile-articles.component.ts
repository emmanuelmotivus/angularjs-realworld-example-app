import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss']
})
export class ProfileArticlesComponent implements OnInit {
  // The profile for this page, resolved by Angular Router
  profile: Profile;
  
  // Current profile state (main or favorites)
  profileState: string;
  
  // Configuration for the article list component
  listConfig: {
    type: string;
    filters?: {
      author?: string;
      favorited?: string;
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    // Initialize listConfig with default type
    this.listConfig = { type: 'all' };
  }

  ngOnInit(): void {
    // Get the profile data from the route resolver
    this.route.data.subscribe(data => {
      this.profile = data.profile;
      this.configureArticleList();
    });

    // Determine the current profile state from the URL
    const url = this.router.url;
    this.profileState = url.includes('/favorites') ? 'favorites' : 'main';
    
    this.configureArticleList();
  }

  /**
   * Configure the article list based on the current profile state
   * This replaces the constructor logic from the AngularJS controller
   */
  private configureArticleList(): void {
    if (!this.profile) {
      return;
    }

    // `main` state's filter should be by author
    if (this.profileState === 'main') {
      this.listConfig.filters = { author: this.profile.username };
      // Set page title
      this.titleService.setTitle('@' + this.profile.username);
    } else if (this.profileState === 'favorites') {
      this.listConfig.filters = { favorited: this.profile.username };
      // Set page title
      this.titleService.setTitle(`Articles favorited by ${this.profile.username}`);
    }
  }
}