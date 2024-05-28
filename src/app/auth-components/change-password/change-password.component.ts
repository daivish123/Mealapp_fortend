import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changepasswordForm: FormGroup;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  constructor(private fb: FormBuilder) {
    this.changepasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword').value;
    const confirmNewPassword = form.get('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
      form.get('confirmNewPassword').setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }

  changePassword() {
    if (this.changepasswordForm.valid) {
      // Handle the change password logic
      console.log('Password changed successfully');
    }
  }
}
