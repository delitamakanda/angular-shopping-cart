import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import {NavigationStart, Router} from "@angular/router";
import {Subject} from "rxjs";

describe('LoaderService', () => {
  let service: LoaderService;
  let router: Router
  let routerEventSub: Subject<any>

  beforeEach(() => {
    routerEventSub = new Subject<any>();
    TestBed.configureTestingModule({
      providers: [LoaderService, {
        provide: Router,
        useValue: { events: routerEventSub.asObservable() }
      }],
      imports: [],
      declarations: [],
      schemas: []
    });
    service = TestBed.inject(LoaderService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize loader', () => {
    spyOn(service as any, 'createOverlay');
    service.initializeLoader();
    routerEventSub.next(new NavigationStart(1, '/'));
    expect((service as any).createOverlay).toHaveBeenCalled();
  });
});
