// show-authed.directive.ts
import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // Input property to replace the attribute value
  @Input() showAuthed: boolean;
  
  // Subscription to track and clean up
  private userSubscription: Subscription;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to the user's authentication state
    // Assuming UserService has a currentUser observable that emits the current user
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => {
        // If user is authenticated
        if (user) {
          if (this.showAuthed === true) {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          }
        // If user is not authenticated
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
    // Clean up subscription when directive is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}