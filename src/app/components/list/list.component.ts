import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserList, IUser, IUserData } from './../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ListComponent implements OnInit, OnDestroy {

  public usersList: IUserData[] = [];

  public page = 1;
  public pageSize = 7;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.dataService.getAllUsers
      .subscribe(() => {
        this.getUsers();
      });
  }

  ngOnDestroy(): void {
    this.dataService.getAllUsers.unsubscribe();
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
    console.log(newData);
  }

  public open(content: any) {
    this.modalService.open(content);
  }

}
