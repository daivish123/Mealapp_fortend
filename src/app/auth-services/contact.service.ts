import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  postQueries(value: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) {}

  sendContactForm(contactData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contactData);
  }
}
