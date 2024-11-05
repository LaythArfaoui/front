import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

const BASE_URL = "https://springboot-render-5-vor0.onrender.com/api/";

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }

  register(registerData: any): Observable<any> {
    return this.http.post(`${BASE_URL}/register`, registerData);
  }

  authenticate(authData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    console.log('Request Data:', authData);
    return this.http.post('https://springboot-render-5-vor0.onrender.com/api/Authenticate', authData, { headers, observe: 'response' })
      .pipe(
        tap(response => console.log('Response:', response)),
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

  getProtectedResource(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${BASE_URL}/protected-resource`, { headers });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL);
  }
}
