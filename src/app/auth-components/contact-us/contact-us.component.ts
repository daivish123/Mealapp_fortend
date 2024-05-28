import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ContactService } from '../../auth-services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  contactUsForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private toast: NgToastService) {

    this.contactUsForm = this.fb.group({
      name: [" ", Validators.required],
      phone: [" ", [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: [" ", [Validators.required, this.customEmailValidator]],
      subject: [" ", Validators.required],
      message: [" ", Validators.required]
    });
  }

  customEmailValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const valid = pattern.test(control.value);
    return valid ? null : { 'invalidEmail': true };
  }

  OnSubmit(): void {
    if (this.contactUsForm.valid) {
      this.contactService.sendContactForm(this.contactUsForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success({ detail: "SUCCESS", summary: "Your message sent successfully!", duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.toast.error({ detail: "ERROR", summary: "Something went wrong!", duration: 3000 });
        }
      });
    }
  }
}
