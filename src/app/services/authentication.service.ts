import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiHostUsers = 'http://localhost:44332';
  private inServiceUser: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  constructor(private http: HttpClient) {

    this.inServiceUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.inServiceUser.asObservable();
  }

  public get currentUserObj(): User {
    return this.inServiceUser.value;
  }

  login(username: string, password: string) {
    let url = `${this.apiHostUsers}/token`;
    let body = `username=${username}&password=${password}&grant_type=password`;
    return this.http.post<any>(url, body, this.httpOptions)
        .pipe(map(user => {
            delete user.token_type;
            delete user.expires_in;
            this.inServiceUser.next(user);
            return user;
        }));
  }

  authenticate () : Observable<any> {
    const url = `${this.apiHostUsers}/api/data/authenticate`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
    };

    return this.http.get<User>(url,headers).pipe(
      map(user => {
        user.access_token = this.inServiceUser.value.access_token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.inServiceUser.next(user);
        return user;
      }),
      catchError(this.handleError<User>(`Authentication Error`))
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.inServiceUser.next(null);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
