import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByComponent } from './sort-by.component';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductServiceMock} from "../../services/product.service.spec";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import { ProductStoreService } from '../../state/product.store.service';
import { signal } from 'node_modules/@angular/core/types/_chrome_dev_tools_performance-chunk';
import { Category } from '../../interfaces';

describe('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;
  let mockStore: any;
  beforeEach(async () => {
    mockStore = {
      setSortBy: jasmine.createSpy('setSortBy'),
      sortBy: signal<string>('default'),
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
        { provide: ProductService, useValue: ProductServiceMock },
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
    expect(component.sortByForm.get('sortBy')?.value).toBe('default');
  });

});
