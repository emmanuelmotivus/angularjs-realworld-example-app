import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';

/**
 * ArticleMetaComponent
 * 
 * This component displays metadata about an article, including author information
 * and publication date. It's been migrated from the AngularJS component that used
 * the '=' binding for two-way binding of the article object.
 * 
 * Migration notes:
 * - Converted AngularJS bindings to Angular @Input properties
 * - Changed templateUrl path to follow Angular conventions
 * - Added proper TypeScript typing with the Article interface
 * - Implemented OnInit interface for initialization logic
 * - Replaced transclude with ng-content for content projection
 */
@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss']
})
export class ArticleMetaComponent implements OnInit {
  // Convert the '=' two-way binding to an @Input property
  // In Angular, inputs are one-way by default
  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {
    // Validate that article is provided
    if (!this.article) {
      console.warn('ArticleMetaComponent: No article provided');
    }
  }
}