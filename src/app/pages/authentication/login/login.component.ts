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
  errorMessage: string | null = null; // Variable to store error messages

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
          // Assuming the response contains the token in a different format, check structure.
          const token = response?.token || response?.body?.token; // Check response body
          if (token) {
            this.authService.saveToken(token);
            const decodedToken: any = jwtDecode(token);
            const role = decodedToken.role;
            localStorage.setItem('role', role);

            // Redirect based on role
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (role === 'USER') {
              this.router.navigate(['/user']);
            }
          } else {
            this.errorMessage = 'Authentication failed. No token received.';
          }
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in the form correctly.';
    }
  }
}
