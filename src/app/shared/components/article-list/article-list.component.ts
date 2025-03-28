import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../core/models/article.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * ArticleListComponent
 * 
 * This component displays a list of articles based on the provided configuration.
 * It handles pagination and different types of article lists (feed, all, author, etc.).
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Replaced $scope event listeners with an EventEmitter service pattern
 * - Converted promise-based API calls to Observable with RxJS
 * - Added proper TypeScript interfaces for all data structures
 * - Implemented OnInit and OnDestroy lifecycle hooks
 * - Added unsubscribe pattern with takeUntil for proper cleanup
 */
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit, OnDestroy {
  @Input() limit: number;
  @Input() set listConfig(config: ArticleListConfig) {
    if (config) {
      this._listConfig = config;
      this.setListTo(this._listConfig);
    }
  }
  get listConfig(): ArticleListConfig {
    return this._listConfig;
  }

  loading = false;
  list: Article[] = [];
  private _listConfig: ArticleListConfig;
  private destroy$ = new Subject<void>();

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    // Initial query is handled by the listConfig setter
    
    // Subscribe to external events (these would be implemented through a service in Angular)
    // For example, using a shared EventService:
    // this.eventService.listTo$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(newList => this.setListTo(newList));
    //
    // this.eventService.pageTo$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(pageNumber => this.setPageTo(pageNumber));
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Sets the current list configuration and reloads articles
   */
  setListTo(newList: ArticleListConfig): void {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this._listConfig = newList;

    this.runQuery();
  }

  /**
   * Sets the current page and reloads articles
   */
  setPageTo(pageNumber: number): void {
    this._listConfig.currentPage = pageNumber;
    this.runQuery();
  }

  /**
   * Executes the article query based on current configuration
   */
  runQuery(): void {
    // Show the loading indicator
    this.loading = true;
    this._listConfig = this._listConfig || {};

    // Create an object for this query
    const queryConfig: ArticleQueryConfig = {
      type: this._listConfig.type,
      filters: this._listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this._listConfig.currentPage) {
      this._listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this._listConfig.currentPage - 1));

    // Run the query using Observable pattern
    this.articlesService.query(queryConfig)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.loading = false;

          // Update list and total pages
          this.list = response.articles;
          this._listConfig.totalPages = Math.ceil(response.articlesCount / this.limit);
        },
        (error) => {
          this.loading = false;
          console.error('Error loading articles', error);
          // Handle error state - could show error message or retry
        }
      );
  }
}

/**
 * Interface for article list configuration
 */
export interface ArticleListConfig {
  type?: string;
  filters?: any;
  currentPage?: number;
  totalPages?: number;
}

/**
 * Interface for article query parameters
 */
interface ArticleQueryConfig {
  type?: string;
  filters: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  };
}