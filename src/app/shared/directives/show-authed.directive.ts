import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';

/**
 * ShowAuthedDirective
 * 
 * This directive controls the visibility of elements based on the authentication state.
 * It replaces the AngularJS 'show-authed' directive with a modern Angular implementation.
 * 
 * Usage:
 * <div [appShowAuthed]="true">Only shown when user is logged in</div>
 * <div [appShowAuthed]="false">Only shown when user is logged out</div>
 */
@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // Input property to determine when to show the element (true = show when authenticated)
  @Input('appShowAuthed') showWhenAuthed: boolean = false;
  
  // Subscription to user changes
  private userSubscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Subscribe to the authentication state observable from UserService
    this.userSubscription = this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        // If user is authenticated
        if (isAuthenticated) {
          if (this.showWhenAuthed) {
            // Show element if showWhenAuthed is true
            this.renderer.setStyle(this.el.nativeElement, 'display', 'inherit');
          } else {
            // Hide element if showWhenAuthed is false
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
          }
        } else {
          // If user is not authenticated
          if (this.showWhenAuthed) {
            // Hide element if showWhenAuthed is true
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
          } else {
            // Show element if showWhenAuthed is false
            this.renderer.setStyle(this.el.nativeElement, 'display', 'inherit');
          }
        }
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription when directive is destroyed
    // This prevents memory leaks
    this.userSubscription.unsubscribe();
  }
}