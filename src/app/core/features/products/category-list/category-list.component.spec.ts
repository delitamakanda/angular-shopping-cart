import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {API_URL} from "../../../../constants";
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {signal} from "@angular/core";

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        {
          provide: API_URL, useValue: 'https://example.com/api'  // Replace with actual API URL in your app
        },
        {
          provide: ProductService, useValue: {
            getCategoriesLegacy: () => {
              return { subscribe: () => {} };
            },
            category: signal('')
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call productService.getCategoriesLegacy() during initialization', () => {
  const productService = TestBed.inject(ProductService);
  const spy = spyOn(productService, 'getCategoriesLegacy').and.callThrough();

  component.ngOnInit();

  expect(spy).toHaveBeenCalled();
  expect(component.categories$).toBeDefined();
});

  it('should reset the category filter when resetCategoryFilter is called', () => {
  const productService = TestBed.inject(ProductService);
  const router = TestBed.inject(Router);

  // Setup spies
  const categorySpy = spyOn(productService.category, 'set');
  const navigateSpy = spyOn(router, 'navigate');

  // Call the method to test
  component.resetCategoryFilter();

  // Verify the expected behavior
  expect(categorySpy).toHaveBeenCalledWith('');
  expect(navigateSpy).toHaveBeenCalledWith(['/'], { queryParams: {}, replaceUrl: true });
});

});
