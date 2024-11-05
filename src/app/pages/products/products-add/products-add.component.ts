import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../productsservice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports:[CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule],
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit { 
  productForm!: FormGroup;
  selectedFile: File | null = null;
  token: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductsAddComponent>,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      picture: [null, Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category:['',Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('picture', this.selectedFile, this.selectedFile.name);
      formData.append('category', this.productForm.get('category')?.value);

      if (this.token) {
        this.productService.addProduct(formData, this.token).subscribe(
          (response) => {
            console.log('Product added:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      } else {
        console.error('Cannot add product because the token is undefined!');
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
