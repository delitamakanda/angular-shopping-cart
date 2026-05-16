import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {API_URL} from "../../../../constants";
import {Router} from "@angular/router";
import {signal} from "@angular/core";
import { ProductStoreService } from 'src/app/core/state/product.store.service';
import { Category } from 'src/app/core/interfaces/category.interface';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      setCategory: jasmine.createSpy('setCategory'),
      categories: signal<Category[]>([
        { name: 'Electronics' },
        { name: 'Computers' },
        { name: 'Clothing' },
      ] as Category[]),
    };
    await TestBed.configureTestingModule({
      imports: [CategoryListComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(withFetch()),
        {
          provide: API_URL, useValue: 'https://example.com/api'  // Replace with actual API URL in your app
        },
        {
          provide: ProductStoreService, useValue: mockStore
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

  it('should reset the category filter when resetCategoryFilter is called', () => {
  const router = TestBed.inject(Router);

  // Setup spies
  const categorySpy = mockStore.setCategory.and.callThrough();
  const navigateSpy = spyOn(router, 'navigate');

  // Call the method to test
  component.resetCategoryFilter();

  // Verify the expected behavior
  expect(categorySpy).toHaveBeenCalledWith('');
  expect(navigateSpy).toHaveBeenCalledWith(['/'], { queryParams: {}, replaceUrl: true });
});

});
