import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
    constructor(private authService: AuthserviceService, private router: Router) {}
  
    canActivate(): boolean {
      const token = this.authService.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;
        
        if (role === 'ADMIN') {
          return true; // Admins can access
        } else {
          this.router.navigate(['/menu']);
          return false; // Redirect to user menu if not admin
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }