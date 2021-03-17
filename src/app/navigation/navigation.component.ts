import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../shared/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  pageName: string;
  email: string;

  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.userService.isLogged()) {
      this.userService.loadUser().subscribe(
        (data: any) => {
          this.email = data.email;
        },
        error => {
          // alert(error);
          console.log(error);
        }
      );
    }
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigateByUrl('/');
  }
}
