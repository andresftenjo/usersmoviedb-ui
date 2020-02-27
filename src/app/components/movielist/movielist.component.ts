import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService, private router: Router) { }
  years: number[] = [];
  selectedYear: number = 0;
  public currentMovies = new MatTableDataSource<Movie>();
  displayedColumns: string[] = ['poster_path', 'title', 'release_date', 'details'];
  totalMovies : number = 0;
  isSearch : boolean = false;

  pullyears = (startYear: number, endYear: number): void => {
    while ( startYear <= endYear ) {
      this.years.push( startYear++ );
    }
  }

  ngOnInit(): void {
    this.pullyears(2010,2019);
  }

  refreshMovies(event){
    if (event.isUserInput) {
        this.isSearch = false;
        this.selectedYear = event.source.value;
        this.movieService.getMoviesByYear(1,20,this.selectedYear).subscribe(data => {
          this.currentMovies = new MatTableDataSource(data.results);
          this.totalMovies = data.total_results;
        });
        this.paginator.pageIndex = 0;
    }
  }

  ngAfterViewInit() {
    this.currentMovies.paginator = this.paginator;
  }

  paginatorChange(event) {
    this.movieService.getMoviesByYear(event.pageIndex+1,this.paginator.pageSize,this.selectedYear).subscribe(data => {
      this.currentMovies = new MatTableDataSource(data.results);
    });
  }

  onSearched(searchObj: any){
    this.isSearch = true;
    this.currentMovies = new MatTableDataSource(searchObj.results);
    this.totalMovies = searchObj.total_results;
    this.paginator.pageIndex = 0;
  }

  public goToDetails = (id:number) => {
    this.router.navigate(['/movie', id]);
  }
}
