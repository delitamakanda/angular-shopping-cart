import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaginationComponent } from './pagination.component';
import { ProductStoreService } from '../../state/product.store.service';
import { API_URL } from 'src/app/constants';
import { ProductService } from '../../services/product.service';
import { Category } from '../../interfaces';
import { signal } from '@angular/core';
import { ProductServiceMock } from '../../services/product.service.spec';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      totalCount: vi.fn().mockReturnValue(100),
      limit: vi.fn().mockReturnValue(10),
      setLimit: vi.fn(),
      goToPage: vi.fn(),
      categories: signal<Category[]>([
        { name: 'Electronics' },
        { name: 'Computers' },
        { name: 'Clothing' },
      ] as Category[]),
    };
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        {
          provide: ProductStoreService,
          useValue: mockStore
        },
        {
          provide: ProductService, useClass: ProductServiceMock,  // Mock the ProductService for testing purposes
         },
        { provide: API_URL, useValue: 'https://example.com/api' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
