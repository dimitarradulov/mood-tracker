import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { AuthContainerComponent } from '../auth-container/auth-container.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { CommonModule } from '@angular/common';
import { AuthFormData } from '../../../models/auth.model';

@Component({
  selector: 'app-auth-form',
  imports: [
    AuthContainerComponent,
    ReactiveFormsModule,
    InputErrorComponent,
    CommonModule,
  ],
  templateUrl: './auth-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  title = input.required<string>();
  description = input.required<string>();
  buttonText = input.required<string>();
  footerTpl = input.required<TemplateRef<any>>();
  submitForm = output<AuthFormData>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    password: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.minLength(6), Validators.required],
    }),
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as AuthFormData);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
