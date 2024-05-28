import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth-services/auth-serive/auth.service';
import { StorageService } from 'src/app/auth-services/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isSpinning: boolean;
  hide =true;
hidePassword: any;

  constructor(private service: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      emailId:[null, Validators.required,Validators.email],
      password: [null, Validators.required]

    })
  }

  submitform(){
    this.service.login(this.loginForm.value).subscribe((res) => {
    console.log(res);
    if(res.EmployeeId!= null){
      const user = {
        id: res.employeeid
      }
      console.log(user);
      StorageService.saveToken(res.jwt);
      StorageService.saveUser(user);
    }
    else{
      console.log("Wrong Credenitals")
    }
    })
  }

}
