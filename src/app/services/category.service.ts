import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(params?: any): Observable<any> {
    return this.http.get<any>(API_URL.CATEGORY.GET_ALL, { observe: 'response', params })
  }
}
