// article-preview.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html' // Updated path to match Angular convention
})
export class ArticlePreviewComponent {
  // Changed from bindings to @Input decorator
  @Input() article: any;
  
  // No constructor needed for this simple component
  
  // Note: The template should be updated separately to replace any $ctrl references with direct property access
  // For example: $ctrl.article should become just article in the template
}