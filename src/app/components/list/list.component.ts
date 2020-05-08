import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';

import { IUserList, IUser, IUserData } from './../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListComponent implements OnInit {

  public usersList: IUserData[] = [];

  public page = 1;
  public pageSize = 7;

  public profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl('', Validators.required)
  });

  public role = '';

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    this.userRole();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.dataService.getAllUsers
      .subscribe(() => {
        this.getUsers();
      });
  }

  // ngOnDestroy(): void {
  //   this.dataService.getAllUsers.unsubscribe();
  // }

  private userRole() {
    this.role = JSON.parse(localStorage.getItem('role'));
    if (this.role === 'admin') {
      return this.role;
    } else {
      return this.role;
    }
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigateByUrl('/login');
  }

  private getUsers(): void {
    this.dataService.getUsersList()
      .subscribe((userData: IUserList) => {
        this.usersList = userData.data;
      });
  }

  public deleteUser(user: IUser): void {
    this.dataService.deleteUser(user).subscribe(() => this.getUsers());
  }

  public updateUser(user: IUser): void {
    const newData = {
      name: user.name,
      email: user.email,
      role: user.role,
      password: ''
    };
    this.dataService.updateUser(newData, user.id).subscribe(() => this.getUsers());
  }

  public open(content: any) {
    this.modalService.open(content);
  }

}
