import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
  export class UserGuard implements CanActivate {
  
    constructor(private authService: AuthserviceService, private router: Router) {}
  
    canActivate(): boolean {
      const token = this.authService.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;
        
        if (role === 'USER') {
          return true; // Users can access
        } else {
          this.router.navigate(['/orderadmins']);
          return false; // Redirect to admin view if not user
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }