import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByComponent } from './sort-by.component';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductServiceMock} from "../../services/product.service.spec";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import { ProductStoreService } from '../../state/product.store.service';
import { signal } from '@angular/core';
import { Category } from '../../interfaces';

describe('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;
  let mockStore: any;
  beforeEach(async () => {
    mockStore = {
      setSortBy: jasmine.createSpy('setSortBy'),
      sortBy: signal<string>('-created_at'),
      categories: signal<Category[]>([
        { name: 'Electronics' },
        { name: 'Computers' },
        { name: 'Clothing' },
      ] as Category[]),
    };
    await TestBed.configureTestingModule({
      imports: [SortByComponent],
      providers: [
        {
          provide: ProductStoreService, useValue: mockStore
        },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: { get: () => null }, set: () => null } } },
        { provide: ProductService, useClass: ProductServiceMock },
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default sorting option when the route does not contain a sort parameter', () => {
    component.ngOnInit();
    expect(component.sortByForm.get('sortBy')?.value).toBe('-created_at');
  });

});
