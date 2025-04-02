import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss']
})
export class ArticleMetaComponent {
  /**
   * The article object to display metadata for
   * Migrated from AngularJS '=' binding to Angular @Input()
   */
  @Input() article!: Article;

  /**
   * Note: The transclude property in the original AngularJS component
   * is handled in Angular through content projection using <ng-content>
   * in the template file.
   */
  constructor() { }
}