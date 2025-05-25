import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AuthLayoutComponent } from '../../layout/auth-layout/auth-layout.component';
import { AuthService } from '../services/auth.service';
import { AuthFormData, AuthMode } from '../models/auth.model';

@Component({
  selector: 'app-auth',
  imports: [AuthFormComponent, RouterModule, AuthLayoutComponent],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private route = inject(ActivatedRoute);
  authService = inject(AuthService);

  authMode = toSignal<AuthMode>(
    this.route.data.pipe(map((data) => data['authMode'])),
    { requireSync: true },
  );

  constructor() {
    effect(() => {
      console.log(this.authService.session());
    });
  }

  onSubmit(value: AuthFormData) {
    if (this.authMode() === 'signup') {
      this.authService.signUp(value.email, value.password);
    } else {
      // this.authService.signIn(value.email, value.password);
    }
  }
}
