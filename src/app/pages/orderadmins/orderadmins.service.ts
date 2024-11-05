import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; 
  
  constructor(private http: HttpClient) { }
 
  getAllOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get<Order[]>(this.apiUrl, { headers });
  }

  getOrderById(id: number): Observable<Order> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Order>(`${this.apiUrl}/${id}`, { headers });
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${this.apiUrl}/${id}/status?status=${status}`;
  
    return this.http.put<Order>(url, null, { headers });
  }
}
