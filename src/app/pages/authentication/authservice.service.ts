import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const BASE_URL = "https://springboot-render-5-vor0.onrender.com/api/v1/auth";  // Base API URL

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}

  // Registration method
  register(registerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${BASE_URL}/register`, registerData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error during registration:', error);
          return throwError(error);
        })
      );
  }

  // Authentication method
  authenticate(authData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${BASE_URL}/authenticate`, authData, { headers, observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Error during authentication:', error);
          return throwError(error);
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
