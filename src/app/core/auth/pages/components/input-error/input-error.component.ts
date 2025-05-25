import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  imports: [CommonModule],
  templateUrl: './input-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent {
  showError = input(false, { transform: booleanAttribute });
  errors = input<ValidationErrors | null | undefined>(null);
  errorMessages = input<{ [key: string]: string }>({});
}
