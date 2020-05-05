import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';

import { IUserLog, IListResp } from './../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public usersList: IUserLog[];

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getUsersList()
      .subscribe(users => this.usersList = users);
  }

}
