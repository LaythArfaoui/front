import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Food } from '../../models/food';
import { ProductsService } from '../productsservice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-products-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.scss']
})
export class ProductsUpdateComponent implements OnInit {
  productForm!: FormGroup;
  selectedFile: any = null;
  token: string | null = null;
  productId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductsUpdateComponent>,
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: Food
  ) {
    this.productId = data.id;
    this.productForm = this.fb.group({
      name: [data.name],
      picture: [null],
      description: [data.description],
      price: [data.price],
      category: [data.category]
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      console.error('No token found in local storage!');
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onSubmit() {
    if (this.productForm.valid && this.productId) {
      const productData: Food = {
        ...this.productForm.value,
        id: this.productId,
        picture: this.selectedFile ? this.selectedFile.name : this.data.picture
      };

      console.log('Token:', this.token);
      if (this.token) {
        this.productService.updateProduct(this.productId, productData, this.token).subscribe(
          (response) => {
            console.log('Product updated:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        console.error('Cannot update product because the token is undefined!');
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
