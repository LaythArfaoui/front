import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from './orderstatus.service';
@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Failed to load orders', error);
      }
    );
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      (updatedOrder) => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
          order.status = updatedOrder.status;
        }
      },
      (error) => {
        console.error('Failed to update order status', error);
      }
    );
  }
}

