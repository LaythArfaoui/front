import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private orderItemsSubject = new BehaviorSubject<OrderItem[]>([]);
  orderItems$ = this.orderItemsSubject.asObservable();

  addItem(item: OrderItem) {
    const currentItems = this.orderItemsSubject.value;
    this.orderItemsSubject.next([...currentItems, item]);
  }

  clearItems() {
    this.orderItemsSubject.next([]);
  }

  getItems(): OrderItem[] {
    return this.orderItemsSubject.value;
  }
}
