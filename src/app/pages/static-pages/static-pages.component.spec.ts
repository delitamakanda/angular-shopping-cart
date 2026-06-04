import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticPagesComponent } from './static-pages.component';
import {BehaviorSubject, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {provideHttpClient, withXhr} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {StaticPagesStoreService} from "./state/static-pages.store.service";
import { signal } from "@angular/core";

describe('StaticPagesComponent', () => {
  let component: StaticPagesComponent;
  let fixture: ComponentFixture<StaticPagesComponent>;
  let mockStore: jasmine.SpyObj<StaticPagesStoreService>;
  let paramsSubjectMock: BehaviorSubject<any>;

  beforeEach(async () => {
    paramsSubjectMock = new BehaviorSubject<any>({ page: 'test' });
    mockStore = jasmine.createSpyObj('StaticPagesStoreService', ['fetchPage']);
    mockStore.fetchPage.and.returnValue(of('test content'));

    (mockStore as any).loading = signal(false);
    (mockStore as any).selectedPage = signal('');
    (mockStore as any).error = signal('');

    await TestBed.configureTestingModule({
      imports: [StaticPagesComponent],
      providers: [
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { params: paramsSubjectMock.asObservable() } },
        { provide: StaticPagesStoreService, useValue: mockStore }
      ]
    }).overrideComponent(StaticPagesComponent, {
      remove: {
        providers: [StaticPagesStoreService]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticPagesComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch page content', () => {
    fixture.detectChanges();
    expect(mockStore.fetchPage).toHaveBeenCalledWith('test');
  })

  it('should handle route param changes', () => {
    paramsSubjectMock.next({ page: 'new-page' });
    fixture.detectChanges();
    expect(mockStore.fetchPage).toHaveBeenCalledWith('new-page');
  })

  it('should expose loading, selectedPage, and error signals', () => {
    expect(component.store).toBe(mockStore);
    expect(component.store.loading).toBeDefined();
    expect(component.store.selectedPage).toBeDefined();
    expect(component.store.error).toBeDefined();
  });

});
