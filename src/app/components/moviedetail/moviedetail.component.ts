import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss']
})
export class MoviedetailComponent implements OnInit {

  public currentMovie: Movie;
  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.movieService.getMovieDetails(params.id).subscribe((data: Movie) => {
        //this.id = params.id;
       this.currentMovie = data;
      });
    });
  }

}
