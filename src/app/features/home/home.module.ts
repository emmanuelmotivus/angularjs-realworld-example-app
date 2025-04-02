import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

/**
 * Home Feature Module
 * 
 * This module encapsulates all functionality related to the home page.
 * It uses lazy loading through the HomeRoutingModule for better performance.
 * 
 * Components:
 * - HomeComponent: Main component for the home page (converted from HomeCtrl)
 */
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, // For ngIf, ngFor and other common directives
    HomeRoutingModule, // Handles routing configuration for the home feature
    SharedModule // For shared components, directives, and pipes
  ]
})
export class HomeModule { }