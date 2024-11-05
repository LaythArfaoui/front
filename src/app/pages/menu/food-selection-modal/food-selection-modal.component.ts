import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-food-selection-modal',
  templateUrl: './food-selection-modal.component.html',
  styleUrls: ['./food-selection-modal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
})
export class FoodSelectionModalComponent {
  quantity: number = 1;
  comments: string = '';

  constructor(public dialogRef: MatDialogRef<FoodSelectionModalComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({ quantity: this.quantity });
  }
}
