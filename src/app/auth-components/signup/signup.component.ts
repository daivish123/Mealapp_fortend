import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { AuthService } from 'src/app/auth-services/auth-serive/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isSpinning: boolean;
  validateForm: FormGroup;
  primary: string = "primary"; // Define primary property
  registrationSuccess: boolean = false;
  registrationError: boolean = false;
isLoadingOne: BooleanInput;
hide =true;
hidePassword: any;

  constructor(private service: AuthService, 
              private fb: FormBuilder, private route : Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: new FormControl(''),
        // Define other form controls here
  
      employeeId: ["", [Validators.required, Validators.maxLength(15)]],
      name: ["", Validators.required],
      emailId: ["", [Validators.required, Validators.email]],
      contactNo: ["", [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ["", [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)]],
      checkPassword: ["", [Validators.required, this.confirmationValidator]]
    });
  }

  confirmationValidator = (control: FormGroup) => {
    const password = control.parent ? control.parent.get('password') : null;
    const confirm = control.parent ? control.parent.get('checkPassword') : null;
    if (!password || !confirm) {
      return null;
    }
    return password.value === confirm.value ? null : { passwordMismatch: true };
  };

  signup() { 
    
    this.isSpinning = true;

    this.service.signup(this.validateForm.value).subscribe((res) =>{
      this.registrationSuccess = true;
        this.isSpinning = false;
    },
    (error) => {
      this.registrationError = true;
      this.isSpinning = false; // Hide spinner on error
    }
  )
    console.log(this.validateForm.value);
    this.service.signup(this.validateForm.value).subscribe((res) => {
      console.log(res);

    })

    if(this.registrationSuccess){
      this.route.navigateByUrl("/login");
    }
  }
}
