import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public api = 'http://dev.angulartest.digital-era.ru/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public loginUser(user: IUser) {
    this.http.post<IUser>(`${this.api}/login`, user)
      .subscribe((auth: IUser) => {
        if (auth) {
          localStorage.setItem('token', JSON.stringify(auth.token));
          this.router.navigateByUrl('/list');
        }
      });
  }

}
