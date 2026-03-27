import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.html',
  host: {
    'class': 'block w-full'
  },
  styles: ``,
})
export class SectionTitle {
  @Input({ required: true }) title: string = '';
}
