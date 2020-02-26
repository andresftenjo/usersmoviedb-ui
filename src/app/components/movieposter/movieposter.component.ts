import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movieposter',
  templateUrl: './movieposter.component.html',
  styleUrls: ['./movieposter.component.scss']
})
export class MovieposterComponent implements OnInit {

  @Input() posterSource: string;
  @Input() posterSize: string;
  posterHost: string = 'http://image.tmdb.org/t/p/original';

  constructor() { }


  ngOnInit(): void {
  }

}
