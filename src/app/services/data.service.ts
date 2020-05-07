import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { IUserList, IUser } from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiAllUsers = 'http://dev.angulartest.digital-era.ru/api/user?perPage=-1';
  private apiUser = 'http://dev.angulartest.digital-era.ru/api/user';

  public getAllUsers = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  public getUsersList(): Observable<IUserList> {
    return this.http.get<IUserList>(this.apiAllUsers);
  }

  public addNewUser(user: IUser): void {
    this.http.post<IUser>(this.apiUser, user).subscribe(u => {
      this.getAllUsers.next(null);
    });
  }

  public deleteUser(user: IUser | number): Observable<IUser> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.apiUser}/${id}`;
    return this.http.delete<IUser>(url);
  }

  public updateUser(user: IUser, id: number): Observable<IUser> {
    const url = `${this.apiUser}/${id}`;
    return this.http.put<IUser>(url, user);
  }

}
