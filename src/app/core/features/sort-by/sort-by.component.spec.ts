import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByComponent } from './sort-by.component';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductServiceMock} from "../../services/product.service.spec";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortByComponent],
      providers: [
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
