import { Component, OnInit , EventEmitter , Output, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-searchmovie',
  templateUrl: './searchmovie.component.html',
  styleUrls: ['./searchmovie.component.scss']
})
export class SearchmovieComponent implements OnInit {

  searchForm: FormGroup;
  @Input() selectedYear : number;
  @Output() searchObj = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private movieService: MovieService) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      term: ['', Validators.required]
    });
  }

    //getter to access to form fields
  get f() { return this.searchForm.controls; }

  searchMovie() {
    this.movieService.searchMoviesByYear(1,20,this.selectedYear, this.f.term.value).subscribe(data => {
      this.searchObj.emit(data);
    });
  }
}
