import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { MovieRating } from '../models/movierating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiUserRatings = 'http://localhost:44332/api';
  private inServiceUser: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.inServiceUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.inServiceUser.asObservable();
  }

  getMovieRatings(movieId: number) : Observable<MovieRating> {

    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
    };
    const idUser = this.inServiceUser.value.UserId;

    let url = `${this.apiUserRatings}/rank?idUser=${idUser}&idMovie=${movieId}`;
    return this.http.get<MovieRating>(url, headers)
      .pipe(
        tap(_ => console.log('fetched Movie ratings')),
        catchError(this.handleError<any>('getMovieRatings', {}))
      );
  }

  postRating(movieRating: MovieRating): Observable<MovieRating> {
    let url = `${this.apiUserRatings}/rank`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
    };
    movieRating.IdUser = this.inServiceUser.value.UserId;

    return this.http.post<MovieRating>(url, movieRating, headers).pipe(
      tap(_ => console.log('posted rank')),
      catchError(this.handleError<MovieRating>('postRating'))
    );
  }

  putRating(id:number, movieRating: MovieRating): Observable<MovieRating> {
    let url = `${this.apiUserRatings}/rank/?Id=${id}`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
    };

    return this.http.put<MovieRating>(url, movieRating, headers).pipe(
      tap(_ => console.log('updated rank')),
      catchError(this.handleError<MovieRating>('putRating'))
    );
  }

  deleteRating(id: number): Observable<MovieRating> {
    const url = `${this.apiUserRatings}/rank?Id=${id}`;
    const headers = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.inServiceUser.value.access_token })
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
