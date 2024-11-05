import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  form: FormGroup;

  constructor(private authService: AuthserviceService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const loginData = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      };

      this.authService.authenticate(loginData).subscribe(
        response => {
          console.log('Login successful:', response);
          const token = response.body?.token;
          if (token) {
            localStorage.setItem('token', token);
            const decodedToken: any = jwtDecode(token);
            const role = decodedToken.role;
            localStorage.setItem('role', role);

            // Redirect based on role
            if (role === 'ADMIN') {
              this.router.navigate(['/orderadmins']); // Admin sees orders and products
            } else if (role === 'USER') {
              this.router.navigate(['/menu']); // User sees menu and orders
            } else {
              console.error('Unknown role:', role);
            }
            console.log('User role and token stored in localStorage');
          } else {
            console.error('Token is missing in the response');
          }
        },
        error => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
