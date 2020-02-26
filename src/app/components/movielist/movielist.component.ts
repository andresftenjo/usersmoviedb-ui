import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private movieService: MovieService) { }
  years: number[] = [];
  selectedYear: number = 0;
  public currentMovies = new MatTableDataSource<Movie>();
  displayedColumns: string[] = ['poster_path', 'title', 'release_date', 'details'];
  totalMovies : number = 0;


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
      //this.totalMovies = data.total_results;
    });

    //this.movieService.getMoviesByYear(this.paginator.pageIndex,this.paginator.pageSize,this.selectedYear);
    /* .subscribe(data => {
      this.currentMovies = new MatTableDataSource(data.results);
      this.totalMovies = data.total_results;
    });

    this.movieService.getMoviesByYear(
        this.course.id,
        '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize); */
  }

}
