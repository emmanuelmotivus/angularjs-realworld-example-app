import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ArticlesService } from '../../../../core/services/articles.service';
import { Article } from '../../../../core/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnChanges {
  @Input() limit: number = 20;
  @Input() config: any = {};

  articles: Article[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.runQuery();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    console.log('Running article query with config:', this.config);
    
    // Create limit and offset query params
    const queryConfig = {
      limit: this.limit,
      offset: (this.currentPage - 1) * this.limit,
      filters: {}
    };

    // Copy over any custom filters from the config
    Object.assign(queryConfig.filters, this.config.filters || {});

    // Determine the API endpoint based on the config type
    if (this.config.type === 'feed') {
      this.articlesService.getFeed(queryConfig).subscribe(
        data => {
          this.loading = false;
          this.articles = data.articles;
          console.log('Feed articles loaded:', data.articles.length);
          
          // Calculate total pages
          this.totalPages = Math.ceil(data.articlesCount / this.limit);
        },
        error => {
          this.loading = false;
          console.error('Error loading feed:', error);
        }
      );
    } else {
      this.articlesService.getAll(queryConfig).subscribe(
        data => {
          this.loading = false;
          this.articles = data.articles;
          console.log('All articles loaded:', data.articles.length);
          
          // Calculate total pages
          this.totalPages = Math.ceil(data.articlesCount / this.limit);
        },
        error => {
          this.loading = false;
          console.error('Error loading articles:', error);
        }
      );
    }
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }
}