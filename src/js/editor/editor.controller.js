// editor.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html', // Assuming the template is in a separate file
  styleUrls: ['./editor.component.css'] // Assuming there's a CSS file
})
export class EditorComponent implements OnInit {
  // Properties
  article: any; // Consider creating an Article interface/model
  tagField: string = '';
  isSubmitting: boolean = false;
  errors: any = {};

  constructor(
    private articlesService: ArticlesService, // Renamed from _Articles to follow Angular naming conventions
    private router: Router, // Replaced $state with Angular Router
    private route: ActivatedRoute // Added to get article from route data
  ) {}

  ngOnInit() {
    // Get article from resolver if available
    // This replaces the constructor logic that checked for an article
    this.route.data.subscribe(data => {
      if (data.article) {
        this.article = data.article;
      } else {
        this.article = {
          title: '',
          description: '',
          body: '',
          tagList: []
        };
      }
    });
  }

  addTag() {
    // Method remains largely the same
    if (!this.article.tagList.includes(this.tagField)) {
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName: string) {
    // Method remains the same but with type annotation
    this.article.tagList = this.article.tagList.filter((slug: string) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    // Using the ArticlesService but with Angular's approach
    this.articlesService.save(this.article).subscribe(
      // Success callback
      (newArticle) => {
        // Navigate using Angular Router instead of $state
        this.router.navigate(['/article', newArticle.slug]);
      },
      // Error callback
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors; // Updated to match Angular HttpClient error format
      }
    );
  }
}