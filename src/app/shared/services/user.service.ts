import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {BaseResponse} from '../models/base-response';
import {UserModel} from '../models/user';

const TOKEN = 'TOKEN';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  signUp(user: UserModel): Observable<BaseResponse> {
    const url = environment.userURLs.signUp;

    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers};

    return this.http.post<BaseResponse>(url, body, options);
  }

  signIn(user: UserModel): Observable<BaseResponse> {
    const url = environment.userURLs.signIn;

    const body = {
      email: user.email,
      password: user.password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers};

    return this.http.post<BaseResponse>(url, body, options);
  }

  logOut(): void {
    localStorage.removeItem(TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  isLogged(): boolean {
    return localStorage.getItem(TOKEN) != null;
  }

  loadUser() {
    const url = environment.userURLs.userInfo;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem(TOKEN)
    });
    const options = {headers};

    return this.http.get<BaseResponse>(url, options);
  }
}
