import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService: AuthserviceService, private router: Router) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const registerData = {
        firstname: this.form.get('firstname')?.value,
        lastname: this.form.get('lastname')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      };

      this.authService.register(registerData).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/authentication/login']);
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
