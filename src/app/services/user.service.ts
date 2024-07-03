import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { API_URL } from '../constants/api.constant';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../components/dtos/user/register.dto';
import { LoginDTO } from '../components/dtos/user/login.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // protected http: HttpClient;
  private apiConfig = {
    headers: this.createHeaders()
  }

  constructor(
    // private injector: Injector,
    private http: HttpClient,
  ) {
    // this.http = injector.get(HttpClient);
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
  }

  register(registerData: RegisterDTO): Observable<HttpResponse<any>> {
    return this.http.post<any>(API_URL.USER.REGISTER, registerData, {
      headers: this.apiConfig.headers,
      observe: 'response'
    })
  }

  login(loginData: LoginDTO): Observable<HttpResponse<any>> {
    return this.http.post<any>(API_URL.USER.LOGIN, loginData, {
      headers: this.apiConfig.headers,
      observe: 'response'
    })
  }
}
