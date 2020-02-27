import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmovieComponent } from './searchmovie.component';

describe('SearchmovieComponent', () => {
  let component: SearchmovieComponent;
  let fixture: ComponentFixture<SearchmovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
