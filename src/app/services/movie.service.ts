import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiHostMovies = 'https://api.themoviedb.org/3';
  private api_key = 'ec710cf0baa819470d27d508e5004923';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getMoviesByYear(page: number, pageSize: number, year: number) : Observable<any> {
    let url = `${this.apiHostMovies}/discover/movie?api_key=${this.api_key}&sort_by=primary_release_date.asc&include_adult=false&page=${page}&primary_release_year=${year}`;
    return this.http.get<any[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched Movies')),
        catchError(this.handleError<any>('getMoviesByYear', {}))
      );
  }

  searchMoviesByYear(page: number, pageSize: number, year: number, term: string) : Observable<any> {
    let url = `${this.apiHostMovies}/search/movie?api_key=${this.api_key}&query=${term}&include_adult=false&page=${page}&primary_release_year=${year}`;
    return this.http.get<any[]>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetched Movies from search')),
        catchError(this.handleError<any>('searchMoviesByYear', {}))
      );
  }

  getMovieDetails(id: number): Observable<Movie>{
    let url = `${this.apiHostMovies}/movie/${id}?api_key=${this.api_key}`;
    return this.http.get<Movie>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log('fetch Movie details')),
        catchError(this.handleError<any>('getMovieDetail', {}))
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
