import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';

/**
 * ArticlePreviewComponent
 * 
 * This component displays a preview of an article, including:
 * - Article metadata (author, date)
 * - Title and description
 * - Favorite button and tag list
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular component
 * - Changed bindings: '=' to @Input() for one-way binding
 * - Added proper TypeScript typing with Article interface
 * - External template reference maintained but path updated to follow Angular conventions
 */
@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  // Convert AngularJS two-way binding '=' to Angular @Input()
  // In Angular, inputs are one-way by default
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
    // Initialize component if needed
    // Equivalent to $onInit in AngularJS
  }
}