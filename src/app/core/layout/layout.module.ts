import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/**
 * Layout Module
 * 
 * This module contains the main layout components that structure the application.
 * These components typically include the header and footer that appear on all pages.
 * 
 * Components:
 * - HeaderComponent: The application header with navigation
 * - FooterComponent: The application footer
 */
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule // Imported for common directives like ngIf, ngFor, etc.
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule { }