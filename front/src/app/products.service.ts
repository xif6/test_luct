import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.productsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  scrapProducts(): Observable<any> {
    return this.http.get(this.productsUrl + '/scrap')
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    return throwError(error.error.message);
  }
}
