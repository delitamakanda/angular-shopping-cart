import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { ProductStoreService } from '../../state/product.store.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      totalCount: jasmine.createSpy('totalCount').and.returnValue(100),
      limit: jasmine.createSpy('limit').and.returnValue(10),
      setLimit: jasmine.createSpy('setLimit'),
      goToPage: jasmine.createSpy('goToPage'),
    };
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        {
          provide: ProductStoreService,
          useValue: mockStore
        }
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
