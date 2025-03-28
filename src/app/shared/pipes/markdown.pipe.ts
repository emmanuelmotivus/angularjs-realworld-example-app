import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    if (!content) {
      return '';
    }
    
    try {
      return marked(content);
    } catch (error) {
      console.error('Error transforming markdown:', error);
      return content; // Return the original content if transformation fails
    }
  }
}
