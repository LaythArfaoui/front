import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableService,Table } from './table.service';

@Component({
  selector: 'app-restaurant-map',
  imports:[CommonModule,FormsModule],
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.scss']
})
export class RestaurantMapComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getTables().subscribe(tables => this.tables = tables);
  }

  reserveTable(table: Table): void {
     }
}
