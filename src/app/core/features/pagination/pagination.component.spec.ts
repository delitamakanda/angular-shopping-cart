import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {ProductService} from "../../services/product.service";

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            hasMorePage: () => false,
            hasPreviousPage: () => false,
            setPageNext: () => {},
            setPagePrevious: () => {}
          }
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

  it('should disable previous button when there is no previous page', () => {
    const previousButton = fixture.nativeElement.querySelector('button[aria-label="Previous"]');
    expect(previousButton.disabled).toBeTruthy();
  });

  it('should disable next button when there is no next page', () => {
    const nextButton = fixture.nativeElement.querySelector('button[aria-label="Next"]');
    expect(nextButton.disabled).toBeTruthy();
  });

});
