import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStore } from '../../../auth/data/auth.store';

@Component({
  selector: 'app-complete-profile',
  imports: [],
  templateUrl: './complete-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteProfileComponent {
  authStore = inject(AuthStore);

  signOut() {
    this.authStore.signOut();
  }
}
