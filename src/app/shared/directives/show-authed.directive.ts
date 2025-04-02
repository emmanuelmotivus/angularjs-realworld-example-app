import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';

/**
 * ShowAuthedDirective
 * 
 * This directive controls element visibility based on user authentication status.
 * It replaces the AngularJS 'show-authed' directive with a modern Angular implementation.
 * 
 * Usage:
 * <div [showAuthed]="true">Only shown when user is authenticated</div>
 * <div [showAuthed]="false">Only shown when user is NOT authenticated</div>
 */
@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // Input property to determine visibility behavior
  @Input() showAuthed: boolean;
  
  // Subscription to track and properly clean up user status subscription
  private userSubscription: Subscription;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to the user's authentication status
    // Using the Renderer2 service for DOM manipulation instead of direct element access
    // for better compatibility with different rendering platforms
    this.userSubscription = this.userService.currentUser.subscribe(
      (userData) => {
        // User is authenticated
        if (userData) {
          if (this.showAuthed === true) {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          }
        // User is not authenticated
        } else {
          if (this.showAuthed === true) {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          }
        }
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}