import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import the converted components
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

/**
 * LayoutModule
 * 
 * This module contains the main layout components of the application
 * such as the header and footer that are shared across multiple pages.
 * 
 * The components in this module are typically used in the main app component
 * to create the application shell.
 */
@NgModule({
  imports: [
    CommonModule, // Provides common directives like ngIf, ngFor
    RouterModule, // Needed for routerLink in header/footer navigation
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    // Export components so they can be used in other modules
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }