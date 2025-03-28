import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Profile } from '../../../../core/models/profile.model';
import { ArticleListConfig } from '../../../../shared/models/article-list-config.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html'
})
export class ProfileArticlesComponent implements OnInit {
  // The profile for this page, resolved by Angular Router
  profile: Profile;
  
  // Determines which tab is active (main articles or favorites)
  profileState: string;
  
  // Configuration for the article list component
  listConfig: ArticleListConfig = { type: 'all' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Get the profile from the route resolver
    this.profile = this.route.snapshot.data['profile'];
    
    // Determine which tab is active based on the current route
    const url = this.router.url;
    this.profileState = url.includes('/favorites') ? 'favorites' : 'main';

    // Configure article list based on the active tab
    if (this.profileState === 'main') {
      // Show articles authored by this profile
      this.listConfig.filters = { author: this.profile.username };
      
      // Set page title
      this.titleService.setTitle('@' + this.profile.username);
    } else if (this.profileState === 'favorites') {
      // Show articles favorited by this profile
      this.listConfig.filters = { favorited: this.profile.username };
      
      // Set page title
      this.titleService.setTitle(`Articles favorited by ${this.profile.username}`);
    }
  }
}