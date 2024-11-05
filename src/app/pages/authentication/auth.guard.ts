import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role;
      
      if (role === 'ADMIN') {
        return true; // Admins can access admin routes
      } else if (role === 'USER') {
        return true; // Users can access user routes
      } else {
        this.router.navigate(['/login']);
        return false; // Unauthorized, redirect to login
      }
    } else {
      this.router.navigate(['/login']);
      return false; // No token found, redirect to login
    }
  }
}
