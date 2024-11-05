import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ProductsAddComponent } from '../products-add/products-add.component';
import { MatIconModule } from '@angular/material/icon';
import { Food } from '../../models/food';
import { ProductsService } from '../productsservice.service';
import { CommonModule } from '@angular/common';
import { ProductsUpdateComponent } from '../products-update/products-update.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,CommonModule],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss'
})
export class ProductsViewComponent {
  products: Food[] = [];
  token: string | null = null;

  constructor(private dialog: MatDialog, private productService: ProductsService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loadProducts();
    } else {
      console.error('No token found!');
    }
  }

  loadProducts(): void {
    if (this.token) {
      this.productService.getAllFoods(this.token).subscribe(
        (data) => this.products = data,
        (error) => {
          console.error('Error loading products:', error);
        }
      );
    }
  }

  openAddProductModal() {
    const dialogRef = this.dialog.open(ProductsAddComponent, {
      width: '450px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product Added:', result);
        this.loadProducts();
      }
    });
  }

  editProduct(product: Food) {
    const dialogRef = this.dialog.open(ProductsUpdateComponent, {
      width: '450px',
      height: 'auto',
      data: product 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Product Updated:', result);
        this.loadProducts(); 
      }
    });
  }

  deleteProduct(product: Food) {
    if (!this.token) {
      console.error('No token found!');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete the product: ${product.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id!, this.token!).subscribe(
          () => {
            console.log(`Product deleted: ${product.name}`);
            this.loadProducts(); 
          },
          (error) => {
            console.error('Error deleting product:', error);
          }
        );
      }
    });
  }
}