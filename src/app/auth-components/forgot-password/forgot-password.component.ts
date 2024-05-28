import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-services/auth-serive/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  verifyCodeForm: FormGroup;
  resetPasswordForm: FormGroup;
  currentStep: 'emailId' | 'verify' | 'reset' = 'emailId';
  emailId: string;
  hide =true;
  hidePassword: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({

      emailId:["", [Validators.required,Validators.email]],

    });

    this.verifyCodeForm = this.fb.group({
      code: ['', Validators.required]
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitEmail() {
    if (this.forgotPasswordForm.valid) {
      this.emailId = this.forgotPasswordForm.value.email;
      this.authService.forgotPassword(this.emailId).subscribe(
        response => {
          this.currentStep = 'verify';
        },
        error => {
          // handle error response
        }
      );
    }
  }

  onSubmitCode() {
    if (this.verifyCodeForm.valid) {
      this.authService.verifyCode(this.emailId, this.verifyCodeForm.value.code).subscribe(
        response => {
          this.currentStep = 'reset';
        },
        error => {
          // handle error response
        }
      );
    }
  }

  onSubmitPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.emailId, this.resetPasswordForm.value.newPassword).subscribe(
        response => {
          // Send notification to the user's email
          this.authService.sendPasswordChangeNotification(this.emailId).subscribe();
          this.currentStep = 'emailId'; // Reset the flow
        },
        error => {
          // handle error response
        }
      );
    }
  }
}
