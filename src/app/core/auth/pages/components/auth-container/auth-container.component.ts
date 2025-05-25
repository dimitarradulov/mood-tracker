import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  imports: [],
  templateUrl: './auth-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainerComponent {
  title = input.required<string>();
  description = input.required<string>();
}
