import { Component, inject } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
})
export class LoginPageComponent {
  chatService = inject(ChatService);
  user$ = this.chatService.user$;
  clickTest = 'Ready to click';

  handleMouseDown() {
    console.log('Mouse DOWN detected on button');
    this.clickTest = 'Mouse down...';
  }

  handleMouseUp() {
    console.log('Mouse UP detected on button');
    this.clickTest = 'Mouse up...';
  }

  handleLoginClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    // Visual and console logging
    this.clickTest = 'CLICKED! Processing...';
    console.log('=== BUTTON CLICK DETECTED ===');
    console.log('Button clicked - handleLoginClick called');
    console.log('Event:', event);
    console.log('Event type:', event.type);
    console.log('Event target:', event.target);
    console.log('ChatService:', this.chatService);
    console.log('Auth service available:', !!this.chatService.auth);
    
    // Call login
    try {
      this.chatService.login();
    } catch (error) {
      console.error('Error calling login:', error);
      this.clickTest = 'Error occurred';
      alert('Error: ' + (error as Error).message);
    }
    
    // Reset after 3 seconds
    setTimeout(() => {
      this.clickTest = 'Ready to click';
    }, 3000);
  }
}
