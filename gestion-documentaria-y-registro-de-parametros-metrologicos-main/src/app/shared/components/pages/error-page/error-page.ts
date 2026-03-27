import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
})
export class ErrorPage {
  constructor(private location: Location) {}
  goBack(): void {
    this.location.back(); // Esto regresa al usuario a la página anterior
  }
}
