import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [],
      declarations: [],
      schemas: []
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize loader', () => {
    service.initializeLoader();
    expect(service.overlayRef).toBeTruthy();
  });
});
