import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/api.constant';
import { RoleInterface } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
  ) { }

  getRoles(): Observable<HttpResponse<RoleInterface>> {
    return this.http.get<any>(API_URL.ROLE.GET_ALL, { observe: 'response' })
  }
}
