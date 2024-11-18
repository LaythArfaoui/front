import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

const BASE_URL = "https://springboot-render-5-vor0.onrender.com/api/v1/auth";  // Correct API URL

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) {}

  authenticate(authData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.post(`${BASE_URL}/authenticate`, authData, { headers, observe: 'response' })
      .pipe(
        catchError(error => {
          console.error('Error Response:', error);
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
