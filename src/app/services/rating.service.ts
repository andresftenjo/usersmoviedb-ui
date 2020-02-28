import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { MovieRating } from '../models/movierating';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiUserRatings = 'http://localhost:44332/api';

  constructor(private http: HttpClient, private localStorageService: LocalstorageService) {
  }

  getCurrentUser(){
    return this.localStorageService.getCurrentUser().value;
  }

  getMovieRatings(movieId: number) : Observable<MovieRating> {
    const currentUser = this.getCurrentUser();
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + currentUser.access_token })
    };
    const idUser = currentUser.UserId;
    let url = `${this.apiUserRatings}/rank?idUser=${idUser}&idMovie=${movieId}`;
    return this.http.get<MovieRating>(url, headers)
      .pipe(
        tap(_ => console.log('fetched Movie ratings')),
        catchError(this.handleError<any>('getMovieRatings', {}))
      );
  }

  postRating(movieRating: MovieRating): Observable<MovieRating> {
    const currentUser = this.getCurrentUser();
    let url = `${this.apiUserRatings}/rank`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + currentUser.access_token })
    };
    movieRating.IdUser = currentUser.UserId;

    return this.http.post<MovieRating>(url, movieRating, headers).pipe(
      tap(_ => console.log('posted rank')),
      catchError(this.handleError<MovieRating>('postRating'))
    );
  }

  putRating(id:number, movieRating: MovieRating): Observable<MovieRating> {
    const currentUser = this.getCurrentUser();
    let url = `${this.apiUserRatings}/rank/?Id=${id}`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + currentUser.access_token })
    };

    return this.http.put<MovieRating>(url, movieRating, headers).pipe(
      tap(_ => console.log('updated rank')),
      catchError(this.handleError<MovieRating>('putRating'))
    );
  }

  deleteRating(id: number): Observable<MovieRating> {
    const currentUser = this.getCurrentUser();
    const url = `${this.apiUserRatings}/rank?Id=${id}`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + currentUser.access_token })
    };
    return this.http.delete<MovieRating>(url, headers).pipe(
      tap(_ => console.log('deleted rank')),
      catchError(this.handleError<MovieRating>('deleteRating'))
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
