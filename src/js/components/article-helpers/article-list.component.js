// Import necessary Angular dependencies
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';

// Using @Component decorator instead of AngularJS component definition
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html' // Updated path may need adjustment
})
export class ArticleListComponent implements OnInit, OnDestroy {
  // Convert bindings to @Input properties
  @Input() limit: number;
  @Input() listConfig: any;

  // Component properties
  loading: boolean = false;
  list: Array<any> = [];
  
  // For managing subscriptions
  private subscriptions: Subscription = new Subscription();

  // Inject services through constructor
  constructor(private articlesService: ArticlesService) {}

  // Use ngOnInit instead of constructor for initialization
  ngOnInit() {
    // Initialize with the provided listConfig
    this.setListTo(this.listConfig);
    
    // Note: Angular doesn't use $scope.$on, we would typically use a service with observables
    // If event handling is needed, it should be implemented through a service
  }

  // Clean up subscriptions when component is destroyed
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }

  runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

    // Run the query - converted from promise to subscription
    const querySub = this.articlesService
      .query(queryConfig)
      .subscribe(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.articles;

          this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit);
        }
      );
      
    // Add subscription to be cleaned up later
    this.subscriptions.add(querySub);
  }
}