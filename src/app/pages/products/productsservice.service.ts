import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://springboot-render-5-vor0.onrender.com/api/foods';

  constructor(private http: HttpClient) {}

  addProduct(formData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}`, formData, { headers, responseType: 'text' });
  }

  getAllFoods(token: string): Observable<Food[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Food[]>(this.baseUrl, { headers }).pipe(
      map((foods: Food[]) => foods.map(food => ({
        ...food,
        picture: food.picture ? this.convertToBase64(food.picture) : null
      })))
    );
  }

  updateProduct(id: number, food: Food, token: string): Observable<Food> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Food>(`${this.baseUrl}/${id}`, food, { headers });
  }

  deleteProduct(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
  private convertToBase64(picture: string): string {
    // This method converts the binary data to a Base64-encoded string
    const binaryString = window.atob(picture);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/png' });
    return URL.createObjectURL(blob);
  }
}
