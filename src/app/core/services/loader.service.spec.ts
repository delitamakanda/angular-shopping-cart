import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import {NavigationStart, Router, RouterModule} from "@angular/router";
import {Subject} from "rxjs";
import {provideLocationMocks} from "@angular/common/testing";

describe('LoaderService', () => {
  let service: LoaderService;
  let routerEventSub: Subject<any>

  beforeEach(() => {
    routerEventSub = new Subject<any>();
    TestBed.configureTestingModule({
      providers: [LoaderService, {
        provide: Router,
        useValue: { events: routerEventSub.asObservable() }
      }, provideLocationMocks()],
      imports: [
        RouterModule,
      ],
      declarations: [],
      schemas: []
    });
    service = TestBed.inject(LoaderService);
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
