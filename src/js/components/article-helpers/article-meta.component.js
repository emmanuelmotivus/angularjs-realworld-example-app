// Import necessary Angular decorators
import { Component, Input } from '@angular/core';

/**
 * ArticleMetaComponent - Upgraded from AngularJS component to Angular component
 * Changes:
 * - Added @Component decorator with selector and templateUrl
 * - Changed bindings to @Input property
 * - Removed transclude (Angular content projection is used differently)
 */
@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  // Changed from bindings: { article: '=' } to @Input()
  @Input() article: any;
}