import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth-serive/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  isSpinning: boolean;
  resetpasswordForm: FormGroup;
  primary: string = "primary"; 
  registrationSuccess: boolean = false;
  registrationError: boolean = false;
  isLoadingOne: boolean;
  hide = true;

  constructor(private service: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.resetpasswordForm = this.fb.group({
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\+W).{8,}$/)]],
      checkPassword: ["", [Validators.required]]
    }, { validators: this.confirmationValidator });
  }

  confirmationValidator = (control: FormGroup) => {
    const password = control.get('password');
    const confirm = control.get('checkPassword');
    if (confirm.errors && !confirm.errors['passwordMismatch']) {
      return;
    }
    if (password.value !== confirm.value) {
      confirm.setErrors({ passwordMismatch: true });
    } else {
      confirm.setErrors(null);
    }
  };

  reset() {
    if (this.resetpasswordForm.invalid) {
      return;
    }

    this.isSpinning = true;

    this.service.reset(this.resetpasswordForm.value).subscribe(
      (res) => {
        this.registrationSuccess = true;
        this.isSpinning = false;
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.registrationError = true;
        this.isSpinning = false; // Hide spinner on error
      }
    );
  }
}
