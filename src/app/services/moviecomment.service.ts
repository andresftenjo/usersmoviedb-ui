import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Moviecomment } from '../models/moviecomment';

@Injectable({
  providedIn: 'root'
})
export class MoviecommentService {

  private apiUserComments = 'http://localhost:44332/api';
  private inServiceUser: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.inServiceUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.inServiceUser.asObservable();
  }

  getMovieComments(movieId: number) : Observable<Moviecomment[]> {

    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
    };

    let url = `${this.apiUserComments}/comments?idMovie=${movieId}`;
    return this.http.get<Moviecomment[]>(url, headers)
      .pipe(
        tap(_ => console.log('fetched Movie comments')),
        catchError(this.handleError<any>('getMovieComments', {}))
      );
  }

  postComment(movieComment: Moviecomment): Observable<Moviecomment> {
    let url = `${this.apiUserComments}/comment`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
    };
    movieComment.IdUser = this.inServiceUser.value.UserId;

    return this.http.post<Moviecomment>(url, movieComment, headers).pipe(
      tap(_ => console.log('posted comment')),
      catchError(this.handleError<Moviecomment>('postComment'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
