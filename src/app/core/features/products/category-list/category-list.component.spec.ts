import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {API_URL} from "../../../../constants";
import {ProductService} from "../../../services/product.service";

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
            getCategories: () => {
              return { subscribe: () => {} };
            },
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
});
