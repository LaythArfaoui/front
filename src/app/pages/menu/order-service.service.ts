import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://springboot-render-5-vor0.onrender.com/api/orders/create'; 
  private url ='https://springboot-render-5-vor0.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

 
  createOrder(order: Order, token: string): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Order>(this.apiUrl, order, { headers });
  }
  getOrdersByUserId(userId: number, token: string): Observable<Order[]> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    });

    console.log('Fetching orders with URL:', `${this.url}/user/${userId}`);

    return this.http.get<Order[]>(`${this.url}/user/${userId}`, { headers }).pipe(
        tap(orders => console.log('Fetched orders:', orders)),
        catchError(error => {
            console.error('Error fetching orders:', error);
            return throwError(error);
        })
    );
}
}

