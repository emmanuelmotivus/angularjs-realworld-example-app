import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ArticlesService } from '../../core/services/articles.service';
import { Article } from '../../core/models/article.model';
import { Errors } from '../../core/models/errors.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  // Article model
  article: Article = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  // Form state
  isSubmitting = false;
  errors: Errors = {};
  tagField = '';

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Initialize the component by checking if we're editing an existing article
   * or creating a new one
   */
  ngOnInit() {
    // Check if we're editing an existing article by retrieving it from the resolver
    this.route.data.subscribe(data => {
      if (data.article) {
        this.article = data.article;
      }
    });
  }

  /**
   * Add a tag to the article if it doesn't already exist
   */
  addTag() {
    // Only add the tag if it's not a duplicate
    if (!this.article.tagList.includes(this.tagField)) {
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  /**
   * Remove a tag from the article
   * @param tagName The tag to remove
   */
  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(slug => slug !== tagName);
  }

  /**
   * Save the article and navigate to the article page on success
   */
  submit() {
    this.isSubmitting = true;
    this.errors = {};

    // Use RxJS operators for handling async operations
    this.articlesService.save(this.article)
      .pipe(
        // Ensure isSubmitting is set to false when the operation completes
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(
        // Success handler
        (newArticle: Article) => {
          this.router.navigate(['/article', newArticle.slug]);
        },
        // Error handler
        (err) => {
          this.errors = err.error.errors;
        }
      );
  }
}