import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomTablerIconsModule } from '../../custom-tabler-icons.module';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { OrderItem } from '../models/order-item';
import { Order } from '../models/order';
import { OrderService } from '../menu/order-service.service';
import { OrderStateService } from './order-state-service.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatCardModule,
    CustomTablerIconsModule,
    MatIcon,
    MatFormFieldModule,
    MatGridListModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderItems: OrderItem[] = [];
  token: string | null = null;
  userId: number | null = null;
  comments: string = '';
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private orderStateService: OrderStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTokenAndUserId();
    this.loadOrderItems();
    this.fetchOrders(); // Fetch all past orders on component initialization
  }

  private loadTokenAndUserId(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      console.error('No token found in local storage!');
      return;
    }

    try {
      const decodedToken: any = jwtDecode(this.token);
      this.userId = decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  private loadOrderItems(): void {
    this.orderItems = this.orderStateService.getItems();
    console.log('Order items loaded:', this.orderItems);
  }

  fetchOrders(): void {
    if (this.userId && this.token) {
      this.orderService.getOrdersByUserId(this.userId, this.token).subscribe(
        (orders: Order[]) => {
          this.orders = orders;
          console.log('Fetched orders:', this.orders);
          this.cdr.detectChanges(); 
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }

  submitOrder(): void {
    if (this.token && this.userId !== null) {
      const order = {
        userId: this.userId, 
        items: this.orderItems,
        total: this.getTotalPrice().toFixed(2),
        comment: this.comments
      };

      console.log('Submitting order:', order);
      this.orderService.createOrder(order, this.token).subscribe(
        response => {
          console.log('Order submitted successfully', response);
          this.clearOrder();
        },
        error => {
          console.error('Error submitting order:', error);
        }
      );
    } else {
      console.error('Cannot submit order because the token or user ID is undefined!');
    }
  }

  getTotalPrice(): number {
    return this.orderItems.reduce(
      (total, item) => total + item.food.price * item.quantity,
      0
    );
  }

  clearOrder(): void {
    this.orderStateService.clearItems();
    this.orderItems = [];
    console.log('Order cleared');
  }

  removeItem(item: OrderItem): void {
    this.orderItems = this.orderItems.filter(i => i !== item);
    this.orderStateService.clearItems();
    this.orderItems.forEach(i => this.orderStateService.addItem(i));
    console.log('Item removed:', item);
  }
}
