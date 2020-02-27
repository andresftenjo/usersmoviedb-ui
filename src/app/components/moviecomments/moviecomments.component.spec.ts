import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviecommentsComponent } from './moviecomments.component';

describe('MoviecommentsComponent', () => {
  let component: MoviecommentsComponent;
  let fixture: ComponentFixture<MoviecommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviecommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviecommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
