import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieposterComponent } from './movieposter.component';

describe('MovieposterComponent', () => {
  let component: MovieposterComponent;
  let fixture: ComponentFixture<MovieposterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieposterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieposterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
