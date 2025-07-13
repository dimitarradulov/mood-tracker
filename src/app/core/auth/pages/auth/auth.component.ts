import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthFormComponent } from '../components/auth-form/auth-form.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AuthLayoutComponent } from '../../../layout/auth-layout/auth-layout.component';
import { AuthFormData, AuthMode } from '../../models/auth.model';
import { AuthStore } from '../../data/auth.store';

@Component({
  selector: 'app-auth',
  imports: [AuthFormComponent, RouterModule, AuthLayoutComponent],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private route = inject(ActivatedRoute);
  authStore = inject(AuthStore);

  authMode = toSignal<AuthMode>(
    this.route.data.pipe(map((data) => data['authMode'])),
    { requireSync: true },
  );

  onSubmit(value: AuthFormData) {
    if (this.authMode() === 'signup') {
      this.authStore.signUp(value.email, value.password);
    } else {
      this.authStore.signIn(value.email, value.password);
    }
  }
}
