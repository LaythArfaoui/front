import { Component, OnInit } from '@angular/core';
import { OrderService } from './orderadmins.service';
import { Order } from '../models/order'; 
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatGridTile } from '@angular/material/grid-list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { OrderItem } from '../models/order-item';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-orderadmins',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatIcon,
    MatFormFieldModule,
    MatLabel,
    MatGridTile,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatListItem,
    FormsModule,
    MatCardModule,
    ],
  templateUrl: './orderadmins.component.html',
  styleUrls: ['./orderadmins.component.scss']
})
export class OrderadminsComponent implements OnInit {
  orders: Order[] = [];
  token: string | null = null;
  statusControls: { [key: number]: FormControl } = {};
  searchText: string = '';
  filterEmployees() {
    
  }
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    if (!this.token) {
      console.error('No token found in local storage!');
    }

    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
    
        this.orders.forEach(order => {
          this.statusControls[order.id!] = new FormControl(order.status);
        });
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  onUpdateStatus(order: Order): void {
    const newStatus = this.statusControls[order.id!].value;

    this.orderService.updateOrderStatus(order.id!, newStatus).subscribe(
      (updatedOrder) => {
        console.log('Order updated:', updatedOrder);
  
        const index = this.orders.findIndex(o => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
      },
      (error) => {
        if (error.status === 403) {
          console.error('Access forbidden: You do not have permission to update this order.');
        } else {
          console.error('Error updating order:', error);
        }
      }
    );
  }

  viewOrderDetails(order: Order): void {
    this.router.navigate(['/order-details', order.id]);
  }
}
