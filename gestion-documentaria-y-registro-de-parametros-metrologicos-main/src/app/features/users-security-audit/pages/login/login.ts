import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  // Inyección moderna
  private router = inject(Router);

  // Signals para el estado reactivo
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  goSystem() {
    console.log('Login con:', this.email());
    this.router.navigate(['/document-management']);
  }
}
