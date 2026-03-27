import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Icon } from '../icon/icon';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft';
@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, CommonModule,Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  variant = input<ButtonVariant>('primary');
  icon = input<string>();
  tooltip = input<string>('');
  onlyIcon = input<boolean>(false);
  disabled = input<boolean>(false);
}
