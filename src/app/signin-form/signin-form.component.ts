import { Component, OnInit } from '@angular/core';
import {UserModel} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {BaseResponse} from '../shared/models/base-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css', '../shared/form-styles.css']
})
export class SigninFormComponent implements OnInit {
  user: UserModel;

  constructor(private userService: UserService, private router: Router) { }

  submitted = false;

  ngOnInit(): void {
    this.user = new UserModel();
  }

  onSubmit(): void {
    this.submitted = true;

    this.userService.signIn(this.user).subscribe(
      (data: any) => {
        if (data.token) {
          this.userService.setToken(data.token);
          this.router.navigateByUrl('/');
        }
      },
      error => {
        alert(error);
        console.log(error);
      }
    );
  }
}
