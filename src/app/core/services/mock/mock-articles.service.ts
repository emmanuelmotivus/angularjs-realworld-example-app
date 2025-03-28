import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticlesResponse } from '../articles.service';

@Injectable({
  providedIn: 'root'
})
export class MockArticlesService {
  
  private mockArticles: Article[] = [
    {
      slug: 'how-to-train-your-dragon',
      title: 'How to train your dragon',
      description: 'Ever wonder how?',
      body: 'It takes a Jacobian',
      tagList: ['dragons', 'training'],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'jake',
        bio: 'I work at statefarm',
        image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
        following: false
      }
    },
    {
      slug: 'how-to-migrate-to-angular',
      title: 'How to migrate from AngularJS to Angular',
      description: 'A comprehensive guide',
      body: 'Angular has evolved significantly since AngularJS. This article explores the key differences and provides a step-by-step migration guide.',
      tagList: ['angular', 'javascript', 'migration', 'web development'],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      favorited: false,
      favoritesCount: 42,
      author: {
        username: 'sarah',
        bio: 'Frontend Developer',
        image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
        following: false
      }
    },
    {
      slug: 'understanding-rxjs',
      title: 'Understanding RxJS: Reactive Programming in JavaScript',
      description: 'A deep dive into reactive programming paradigms',
      body: 'RxJS is a powerful library for reactive programming using Observables. Learn how to leverage its features for better async handling.',
      tagList: ['rxjs', 'javascript', 'reactive', 'programming'],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      favorited: true,
      favoritesCount: 28,
      author: {
        username: 'mike',
        bio: 'Software Engineer',
        image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
        following: true
      }
    },
    {
      slug: 'mastering-typescript',
      title: 'Mastering TypeScript: Types, Interfaces, and Best Practices',
      description: 'Improve your JavaScript with strong typing and interfaces',
      body: 'TypeScript adds static typing to JavaScript, enabling better tooling and catching errors early. This article covers advanced TypeScript concepts and patterns.',
      tagList: ['typescript', 'javascript', 'webdev'],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      updatedAt: new Date(Date.now() - 345600000).toISOString(),
      favorited: false,
      favoritesCount: 19,
      author: {
        username: 'emily',
        bio: 'TypeScript enthusiast',
        image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
        following: false
      }
    },
    {
      slug: 'building-with-docker',
      title: 'Building and Deploying Angular Applications with Docker',
      description: 'Containerize your Angular apps for consistent deployment',
      body: 'Docker provides a consistent environment for building and deploying applications. Learn how to set up Docker for Angular development and production.',
      tagList: ['docker', 'devops', 'angular', 'deployment'],
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      updatedAt: new Date(Date.now() - 432000000).toISOString(),
      favorited: false,
      favoritesCount: 15,
      author: {
        username: 'david',
        bio: 'DevOps Engineer',
        image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
        following: false
      }
    }
  ];

  /**
   * Get mock articles with pagination
   */
  getArticles(limit: number = 10, offset: number = 0, filters?: any): ArticlesResponse {
    // Apply filters if provided
    let filteredArticles = [...this.mockArticles];
    
    if (filters) {
      // Filter by tag
      if (filters.tag) {
        filteredArticles = filteredArticles.filter(article => 
          article.tagList.includes(filters.tag)
        );
      }
      
      // Filter by author
      if (filters.author) {
        filteredArticles = filteredArticles.filter(article => 
          article.author.username === filters.author
        );
      }
      
      // Filter by favorited
      if (filters.favorited) {
        filteredArticles = filteredArticles.filter(article => 
          article.favorited === true
        );
      }
    }
    
    // Apply pagination
    const paginatedArticles = filteredArticles.slice(offset, offset + limit);
    
    return {
      articles: paginatedArticles,
      articlesCount: filteredArticles.length
    };
  }

  /**
   * Get mock tags
   */
  getTags(): string[] {
    // Extract all tags from articles and remove duplicates
    const tags = this.mockArticles.reduce((acc, article) => {
      return [...acc, ...article.tagList];
    }, [] as string[]);
    
    return Array.from(new Set(tags));
  }
}
