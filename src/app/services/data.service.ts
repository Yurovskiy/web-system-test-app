import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IListResp, IUserLog } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api = 'http://dev.angulartest.digital-era.ru/api/user?perPage=3&page=1';

  constructor(
    private http: HttpClient
  ) { }

  public getUsersList(): Observable<IUserLog[]> {
    return this.http.get<IUserLog[]>(this.api);
  }
}
