import { Component, OnInit, Input} from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import { MovieRating } from 'src/app/models/movierating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() idMovie : number;
  starEmptyIcon: string = 'star';
  starFullIcon: string = 'star_border';
  selectedRating: number = 0;

  showBorder1 : boolean = true;
  showFill1 : boolean = false;

  showBorder2 : boolean = true;
  showFill2 : boolean = false;

  showBorder3 : boolean = true;
  showFill3 : boolean = false;

  showBorder4 : boolean = true;
  showFill4 : boolean = false;

  showBorder5 : boolean = true;
  showFill5 : boolean = false;

  isNewRating = true;
  movieRatings : MovieRating;

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.getRating(this.idMovie);
  }

  getRating(id: number){
    this.ratingService.getMovieRatings(id).subscribe(data => {
      //this.defaultSavedRatings = true;
      this.movieRatings = data;
      if(data != null && data.Rank1 !== 0){
        this.printRating(data.Rank1);
        this.isNewRating = false;
      }
    });
  }

  postRating(rating_ : number){
    let newRank = new MovieRating();
    newRank.Rank1 = rating_;
    newRank.IdMovie = this.idMovie;

    this.ratingService.postRating(newRank).subscribe(data => {
      //this.getRating(this.idMovie);
    });
  }
  putRating(rating_ : number){
    let setRank = new MovieRating();
    setRank.Rank1 = rating_;

    const idRank = this.movieRatings.Id;
    this.ratingService.putRating(idRank, setRank).subscribe(data => {
      //this.getComments(this.idMovie);
    });
  }
  deleteRating(id: number){
    this.ratingService.deleteRating(id).subscribe(data => {
        this.getRating(this.idMovie);
    });
  }
  setRating(rating: number){
    this.printRating(rating);
    if(this.isNewRating){
      this.postRating(rating);
    } else {
      this.putRating(rating);
    }
  }
  printRating(rating: number){

    this.selectedRating = rating;

    if(rating === 1){
      this.showBorder1 = false;
      this.showFill1 = true;
    } else if(rating === 2){
      this.showBorder1 = false;
      this.showFill1 = true;
      this.showBorder2 = false;
      this.showFill2 = true;
    } else if(rating === 3){
      this.showBorder1 = false;
      this.showFill1 = true;
      this.showBorder2 = false;
      this.showFill2 = true;
      this.showBorder3 = false;
      this.showFill3 = true;
    } else if(rating === 4){
      this.showBorder1 = false;
      this.showFill1 = true;
      this.showBorder2 = false;
      this.showFill2 = true;
      this.showBorder3 = false;
      this.showFill3 = true;
      this.showBorder4 = false;
      this.showFill4 = true;
    }else if(rating === 5){
      this.showBorder1 = false;
      this.showFill1 = true;
      this.showBorder2 = false;
      this.showFill2 = true;
      this.showBorder3 = false;
      this.showFill3 = true;
      this.showBorder4 = false;
      this.showFill4 = true;
      this.showBorder5 = false;
      this.showFill5 = true;
    }
  }
  clearRating(rating:number){
    if(this.selectedRating == rating){
      this.showBorder1 = true;
      this.showFill1 = false;
      this.showBorder2 = true;
      this.showFill2 = false;
      this.showBorder3 = true;
      this.showFill3 = false;
      this.showBorder4 = true;
      this.showFill4 = false;
      this.showBorder5 = true;
      this.showFill5 = false;

      this.deleteRating(this.movieRatings.Id);
    } else {
      if(rating === 1){
        this.showBorder1 = false;
        this.showFill1 = true;

        this.showBorder2 = true;
        this.showFill2 = false;
        this.showBorder3 = true;
        this.showFill3 = false;
        this.showBorder4 = true;
        this.showFill4 = false;
        this.showBorder5 = true;
        this.showFill5 = false;
      } else if(rating === 2){
        this.showBorder1 = false;
        this.showFill1 = true;
        this.showBorder2 = false;
        this.showFill2 = true;
        this.showBorder3 = true;
        this.showFill3 = false;
        this.showBorder4 = true;
        this.showFill4 = false;
        this.showBorder5 = true;
        this.showFill5 = false;
      } else if(rating === 3){
        this.showBorder1 = false;
        this.showFill1 = true;
        this.showBorder2 = false;
        this.showFill2 = true;
        this.showBorder3 = false;
        this.showFill3 = true;
        this.showBorder4 = true;
        this.showFill4 = false;
        this.showBorder5 = true;
        this.showFill5 = false;
      } else if(rating === 4){
        this.showBorder1 = false;
        this.showFill1 = true;
        this.showBorder2 = false;
        this.showFill2 = true;
        this.showBorder3 = false;
        this.showFill3 = true;
        this.showBorder4 = false;
        this.showFill4 = true;
        this.showBorder5 = true;
        this.showFill5 = false;
      }else if(rating === 5){
        this.showBorder1 = false;
        this.showFill1 = true;
        this.showBorder2 = false;
        this.showFill2 = true;
        this.showBorder3 = false;
        this.showFill3 = true;
        this.showBorder4 = false;
        this.showFill4 = true;
        this.showBorder5 = false;
        this.showFill5 = true;
      }
    }
  }
}
