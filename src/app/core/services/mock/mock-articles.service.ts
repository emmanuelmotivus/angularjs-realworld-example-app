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
      body: 'Angular has evolved significantly since AngularJS. This article explores the key differences and provides a step-by-step migration guide.\n\n## Key Differences\n\n### Component-Based Architecture\nAngularJS uses a controller-based architecture, while Angular uses a component-based architecture. This is a fundamental shift in how applications are structured.\n\n```typescript\n// Angular Component Example\n@Component({\n  selector: \'app-example\',\n  template: `<h1>Hello {{name}}</h1>`\n})\nexport class ExampleComponent {\n  name = \'World\';\n}\n```\n\n### Dependency Injection\nAngular\'s dependency injection system is completely rewritten and more powerful.\n\n### TypeScript\nAngular is built with TypeScript, which provides strong typing and better tooling.\n\n## Migration Strategies\n\n1. **Incremental Migration** - Use ngUpgrade to run both frameworks side by side\n2. **Rewrite** - Complete rewrite of the application using Angular CLI\n\n## Conclusion\n\nMigrating from AngularJS to Angular requires careful planning but offers significant benefits in terms of performance, maintainability, and modern features.',
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
      body: 'RxJS is a powerful library for reactive programming using Observables. Learn how to leverage its features for better async handling.\n\n## What is RxJS?\n\nRxJS (Reactive Extensions for JavaScript) is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.\n\n## Key Concepts\n\n### Observables\n\nObservables are lazy collections of multiple values over time. They\'re like functions that can return multiple values over time.\n\n```typescript\nimport { Observable } from \'rxjs\';\n\nconst observable = new Observable(subscriber => {\n  subscriber.next(1);\n  subscriber.next(2);\n  subscriber.next(3);\n  setTimeout(() => {\n    subscriber.next(4);\n    subscriber.complete();\n  }, 1000);\n});\n\nobservable.subscribe({\n  next: x => console.log(\'got value \' + x),\n  error: err => console.error(\'something wrong occurred: \' + err),\n  complete: () => console.log(\'done\'),\n});\n```\n\n### Operators\n\nOperators are pure functions that enable a functional programming style of dealing with collections with operations like `map`, `filter`, `concat`, `reduce`, etc.\n\n### Subjects\n\nSubjects are a special type of Observable that allows values to be multicasted to many Observers.\n\n## Benefits of RxJS\n\n1. **Composition** - RxJS has a powerful composition model.\n2. **Error handling** - Built-in mechanisms for error handling.\n3. **Cancellation** - Easy to cancel execution with unsubscribe.\n\n## Conclusion\n\nRxJS might have a steep learning curve, but it\'s worth it for handling complex asynchronous operations.',
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
      body: 'TypeScript adds static typing to JavaScript, enabling better tooling and catching errors early. This article covers advanced TypeScript concepts and patterns.\n\n## Basic Types\n\nTypeScript provides several basic types that you can use to type your variables:\n\n```typescript\n// Boolean\nlet isDone: boolean = false;\n\n// Number\nlet decimal: number = 6;\n\n// String\nlet color: string = "blue";\n\n// Array\nlet list: number[] = [1, 2, 3];\nlet fruits: Array<string> = ["apple", "banana", "cherry"];\n\n// Tuple\nlet x: [string, number] = ["hello", 10];\n\n// Enum\nenum Color {Red, Green, Blue}\nlet c: Color = Color.Green;\n\n// Any\nlet notSure: any = 4;\n```\n\n## Interfaces\n\nInterfaces are one of TypeScript\'s most powerful features:\n\n```typescript\ninterface User {\n  name: string;\n  id: number;\n  email?: string; // Optional property\n  readonly createdAt: Date; // Read-only property\n}\n\nfunction createUser(user: User): User {\n  return user;\n}\n```\n\n## Advanced Types\n\n### Union Types\n\n```typescript\nfunction formatCommandline(command: string | string[]): string {\n  if (typeof command === "string") {\n    return command.trim();\n  } else {\n    return command.join(" ");\n  }\n}\n```\n\n### Intersection Types\n\n```typescript\ninterface ErrorHandling {\n  success: boolean;\n  error?: { message: string };\n}\n\ninterface ArtworksData {\n  artworks: { title: string }[];\n}\n\ntype ArtworksResponse = ArtworksData & ErrorHandling;\n```\n\n## Best Practices\n\n1. **Enable Strict Mode** - Use TypeScript\'s strict mode for the best type checking.\n2. **Avoid Any** - Try to avoid using `any` as much as possible.\n3. **Use Type Inference** - Let TypeScript infer types when it can.\n4. **Organize Your Types** - Keep your interfaces and type definitions organized.\n\n## Conclusion\n\nTypeScript is a powerful tool for large-scale JavaScript applications, providing better tooling, maintainability, and error catching.',
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
      body: 'Docker provides a consistent environment for building and deploying applications. Learn how to set up Docker for Angular development and production.\n\n## Why Docker for Angular?\n\nUsing Docker for your Angular applications provides several benefits:\n\n1. **Consistent Environments** - The same environment from development to production\n2. **Easier CI/CD Integration** - Containerized builds work well with CI/CD pipelines\n3. **Isolation** - Dependencies are isolated from the host system\n4. **Scalability** - Easy to scale in container orchestration platforms\n\n## Development Environment\n\nHere\'s a Dockerfile for Angular development:\n\n```dockerfile\nFROM node:14-alpine\n\nWORKDIR /app\n\n# Install Angular CLI globally\nRUN npm install -g @angular/cli\n\n# Copy package files\nCOPY package*.json ./\n\n# Install dependencies\nRUN npm install\n\n# Copy project files\nCOPY . .\n\n# Expose port for development server\nEXPOSE 4200\n\n# Start development server\nCMD ["ng", "serve", "--host", "0.0.0.0"]\n```\n\n## Production Environment\n\nFor production, we use a multi-stage build:\n\n```dockerfile\n# Build stage\nFROM node:14-alpine as build\n\nWORKDIR /app\n\nCOPY package*.json ./\nRUN npm install\n\nCOPY . .\nRUN npm run build -- --prod\n\n# Production stage\nFROM nginx:alpine\n\nCOPY --from=build /app/dist /usr/share/nginx/html\n\nCOPY ./nginx-config.conf /etc/nginx/conf.d/default.conf\n\nEXPOSE 80\n\nCMD ["nginx", "-g", "daemon off;"]\n```\n\n## Docker Compose\n\nDocker Compose makes it easy to manage your containers:\n\n```yaml\nversion: \'3\'\n\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile.dev\n    ports:\n      - "4200:4200"\n    volumes:\n      - ./:/app\n      - /app/node_modules\n```\n\n## Conclusion\n\nDockerizing your Angular applications creates a more consistent and reliable development and deployment process. It\'s particularly valuable for larger teams and more complex applications.',
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
   * Get a single article by slug
   */
  getArticle(slug: string): Article | null {
    const article = this.mockArticles.find(article => article.slug === slug);
    return article || null;
  }
  
  /**
   * Get mock comments for an article
   */
  getComments(slug: string): any[] {
    // Generate some mock comments for the article
    return [
      {
        id: 1,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        body: 'This is an excellent article! Thanks for sharing your knowledge.',
        author: {
          username: 'johndoe',
          bio: 'Tech enthusiast',
          image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
          following: false
        }
      },
      {
        id: 2,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        body: 'I found this very helpful for my project. Looking forward to more content like this!',
        author: {
          username: 'jane',
          bio: 'Software Developer',
          image: 'https://storage.googleapis.com/a1aa/image/Z8rBKMWSMPNN8tG-4SJW8YYSqWWN12oq5-UF9yBSIYc.jpg',
          following: true
        }
      }
    ];
  }

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