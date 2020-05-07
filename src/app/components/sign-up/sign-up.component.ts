import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public newUser: IUser = {
    name: '',
    email: '',
    role: 'user',
    password: ''
  };

  public profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl('user')
  });

  constructor(
    private dataService: DataService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  public addNewUser(): void {
    this.dataService.addNewUser(this.profileForm.value);
    this.newUser.name = '';
    this.newUser.email = '';
    this.newUser.password = '';
    this.router.navigateByUrl('/login');
  }

  goBack(): void {
    this.location.back();
  }

}
