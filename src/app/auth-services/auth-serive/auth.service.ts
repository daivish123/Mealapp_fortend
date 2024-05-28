// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// const BASIC_URL = ["http://localhost:8080/"]

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private http: HttpClient) { }

//   signup(RegisterRequest: any): Observable<any> {
//     return this.http.post<[]>(BASIC_URL + "api/auth/register", RegisterRequest)
//   }

//   login(loginRequest: any): Observable<any> {
//     return this.http.post<[]>(BASIC_URL + "api/auth/login", loginRequest)
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { __param } from 'tslib';

const BASIC_URL = "http://localhost:9000/";
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  signup(SignupRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/signup", SignupRequest).pipe(
      catchError(error => {
        const err = new Error('test'); 
        return throwError(() => err);
      })
    );
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/auth/login", loginRequest).pipe(
      catchError(error => {
        const err = new Error('test'); 
        return throwError(() => err);
      })
    );
  }

  reset(resetPassword: any): Observable<any> {
    return this.http.post(BASIC_URL + "resetpassword", resetPassword).pipe(
      catchError(error => {
        const err = new Error('test'); 
        return throwError(() => err);
      })
    );
  }

  changePassword(changePassword: any): Observable<any> {
    return this.http.post(BASIC_URL + "changePassword", changePassword).pipe(
      catchError(error => {
        const err = new Error('test'); 
        return throwError(() => err);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(BASIC_URL + "forgot-password", { email });
  }


  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(BASIC_URL + "verify-code", { email, code });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post(BASIC_URL + "reset-password", { email, newPassword });
  }

  sendPasswordChangeNotification(email: string): Observable<any> {
    return this.http.post(BASIC_URL + "password-change-notification", { email });
  }
}
