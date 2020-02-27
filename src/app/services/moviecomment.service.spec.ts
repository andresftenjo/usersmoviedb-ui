import { TestBed } from '@angular/core/testing';

import { MoviecommentService } from './moviecomment.service';

describe('MoviecommentService', () => {
  let service: MoviecommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviecommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
