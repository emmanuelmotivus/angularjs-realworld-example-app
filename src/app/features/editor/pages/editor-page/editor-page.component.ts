import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ArticlesService } from '../../../../core/services/articles.service';
import { Article } from '../../../../core/models/article.model';
import { Errors } from '../../../../core/models/errors.model';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.scss']
})
export class EditorPageComponent implements OnInit {
  /**
   * The article being edited or created
   */
  article: Article = {} as Article;
  
  /**
   * Flag to track form submission state
   */
  isSubmitting = false;
  
  /**
   * Field for adding new tags
   */
  tagField = new FormControl('');
  
  /**
   * Server validation errors
   */
  errors: Errors = {} as Errors;

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Initialize the component with article data if editing an existing article
   */
  ngOnInit(): void {
    // Check if we're editing an existing article or creating a new one
    this.route.data.subscribe(data => {
      if (data.article) {
        // If article exists in the resolver data, we're editing
        this.article = data.article;
      } else {
        // Otherwise, initialize a new article
        this.article = {
          title: '',
          description: '',
          body: '',
          tagList: []
        } as Article;
      }
    });
  }

  /**
   * Add a tag to the article's tag list
   */
  addTag(): void {
    // Get the tag value from the form control
    const tag = this.tagField.value;
    
    // Only add the tag if it's not already in the tag list
    if (tag && !this.article.tagList.includes(tag)) {
      this.article.tagList.push(tag);
      this.tagField.reset(''); // Clear the input field
    }
  }

  /**
   * Remove a tag from the article's tag list
   * @param tagName The tag to remove
   */
  removeTag(tagName: string): void {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  /**
   * Submit the article form
   */
  submit(): void {
    this.isSubmitting = true;
    this.errors = {} as Errors;

    // Use the ArticlesService to save the article
    this.articlesService.save(this.article)
      .subscribe(
        // Success handler
        (article: Article) => {
          this.router.navigate(['/article', article.slug]);
        },
        // Error handler
        (err: any) => {
          this.isSubmitting = false;
          this.errors = err.error.errors;
        }
      );
  }
}