import { IUser } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: IUser;

  public profileForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.authService.loginUser(this.profileForm.value);
  }

}
