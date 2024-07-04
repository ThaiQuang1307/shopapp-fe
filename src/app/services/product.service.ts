import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(params: any): Observable<any> {
    return this.http.get<any>(API_URL.PRODUCT.GET_ALL, { observe: 'response', params })
  }
}
