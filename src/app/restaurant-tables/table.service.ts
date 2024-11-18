import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Table {
  id: number;
  image: string;
  status:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = 'https://springboot-render-5-vor0.onrender.com/api/tables';

  constructor(private http: HttpClient) {}

  // Get all tables
  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Table[]>('getTables', []))
      );
  }

  // Update a table reservation status
  updateTable(table: Table): Observable<Table> {
    const url = `${this.apiUrl}/${table.id}`;
    return this.http.put<Table>(url, table)
      .pipe(
        catchError(this.handleError<Table>('updateTable'))
      );
  }

  // Handle HTTP operation failures
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
