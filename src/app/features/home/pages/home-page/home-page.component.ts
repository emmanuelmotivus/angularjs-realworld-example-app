import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagsService } from '../../../../core/services/tags.service';
import { UserService } from '../../../../core/services/user.service';
import { ArticlesService } from '../../../../core/services/articles.service';
import { Article } from '../../../../core/models/article.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  isAuthenticated: boolean = false;
  listConfig: any = {
    type: 'all',
    filters: {}
  };
  tags: string[] = [];
  tagsLoaded: boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        
        // Set the list config based on authentication status
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    // Load popular tags
    this.tagsService.getAll().subscribe(
      tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      }
    );
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list
    this.listConfig = { type: type, filters: filters };
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}