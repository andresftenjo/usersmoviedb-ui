import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Moviecomment } from '../models/moviecomment';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class MoviecommentService {

  private apiUserComments = 'http://localhost:44332/api';

  constructor(private http: HttpClient, private localStorageService : LocalstorageService) {
  }

  getCurrentUser(){
    return this.localStorageService.getCurrentUser().value;
  }

  getMovieComments(movieId: number) : Observable<Moviecomment[]> {
    const currentUser = this.getCurrentUser();
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + currentUser.access_token })
    };

    let url = `${this.apiUserComments}/comments?idMovie=${movieId}`;
    return this.http.get<Moviecomment[]>(url, headers)
      .pipe(
        tap(_ => console.log('fetched Movie comments')),
        catchError(this.handleError<any>('getMovieComments', {}))
      );
  }

  postComment(movieComment: Moviecomment): Observable<Moviecomment> {
    const currentUser = this.getCurrentUser();
    let url = `${this.apiUserComments}/comment`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + currentUser.access_token })
    };
    movieComment.IdUser = currentUser.UserId;
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
