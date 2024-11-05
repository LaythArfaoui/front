import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../orderadmins.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardTitle, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { OrderItem } from '../../models/order-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [FormsModule,CommonModule, MatCard, MatCardTitle, MatCardModule, MatListModule,MatIcon],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId!: number;
  order?: Order;
  searchText: string = '';
  filteredItems?: OrderItem[] = [];
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchOrderDetails();
  }
  filterItems(): void {
    if (this.order && this.order.orderItems) {
      this.filteredItems = this.order.orderItems.filter(item =>
        item.food.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  fetchOrderDetails(): void {
    this.orderService.getOrderById(this.orderId).subscribe(
      (data) => {
        this.order = data;
        this.filteredItems =this.order.orderItems; 
      },
      (error) => {
        console.error('Error fetching order details:', error);
      }
    );
  }
}
