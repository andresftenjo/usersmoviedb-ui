import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviecommentService } from 'src/app/services/moviecomment.service';
import { Moviecomment } from 'src/app/models/moviecomment';

@Component({
  selector: 'app-moviecomments',
  templateUrl: './moviecomments.component.html',
  styleUrls: ['./moviecomments.component.scss']
})
export class MoviecommentsComponent implements OnInit {

  @Input() idMovie : number;
  commentsForm: FormGroup;
  comments: Moviecomment[];

  constructor(private movieCommentService: MoviecommentService, private formBuilder: FormBuilder) { }

  //getter to access to form fields
  get f() { return this.commentsForm.controls; }

  ngOnInit(): void {
    this.commentsForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.getComments(this.idMovie);
  }
  getComments(id: number) {
    this.movieCommentService.getMovieComments(id).subscribe(data => {
      this.comments = data;
    });
  }
  addComment(){

    let newComment = new Moviecomment();
    newComment.Comment = this.f.comment.value;
    newComment.IdMovie = this.idMovie;

    this.movieCommentService.postComment(newComment).subscribe(() => {
      this.getComments(this.idMovie);
    });
  }
}
