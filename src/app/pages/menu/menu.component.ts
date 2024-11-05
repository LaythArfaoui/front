import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CustomTablerIconsModule } from '../../custom-tabler-icons.module'; 
import { FoodSelectionModalComponent } from './food-selection-modal/food-selection-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../products/productsservice.service';
import { Food } from '../models/food';
import { CommonModule } from '@angular/common';
import { OrderStateService } from '../order/order-state-service.service';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatFormField,MatLabel,MatOption,MatCardModule, CustomTablerIconsModule, CommonModule,FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products: Food[] = [];
  token: string | null = null;
  searchText: string = '';
  filteredProducts: Food[] = [];
  selectedCategory: string = '';
  categories: string[] = [];
  constructor(
    private dialog: MatDialog, 
    private productService: ProductsService, 
    private orderStateService: OrderStateService
  ) {}
  filterOrders() {
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === '' || product.category === this.selectedCategory));}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loadProducts();
    } else {
      console.error('No token found!');
    }
  }

  loadProducts(): void {
    this.productService.getAllFoods(this.token!).subscribe(
      (data) => {this.products = data;
        this.filteredProducts=this.products;
        this.categories = Array.from(new Set(data.map(item => item.category))); 
        console.log(this.categories);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  openFoodSelectionModal(product: Food) {
    const dialogRef = this.dialog.open(FoodSelectionModalComponent, {
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addToCart(product, result.quantity);
      }
    });
  }

  addToCart(product: Food, quantity: number) {
    if (product.id !== undefined) {
      const orderItem = {
        foodId: product.id,
        quantity: quantity,
        food: product
      };
      this.orderStateService.addItem(orderItem);
      console.log('Item added to cart:', orderItem);
    } else {
      console.error('Product ID is undefined, cannot add to cart');
    }
  }
}
