import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';

/**
 * ArticlePreviewComponent
 * 
 * This component displays a preview of an article in a list.
 * It's been migrated from the AngularJS component that used the '=' binding
 * to an Angular component using the @Input decorator for one-way binding.
 * 
 * The component receives an Article object and renders its preview information
 * including title, description, author details, and favorite status.
 */
@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  // Using @Input() instead of AngularJS bindings
  // Converting the two-way binding '=' to one-way input binding
  @Input() article!: Article;

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
    // This replaces any $onInit logic from AngularJS
  }
}