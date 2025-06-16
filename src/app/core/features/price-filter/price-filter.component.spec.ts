import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFilterComponent } from './price-filter.component';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {API_URL} from "../../../constants";

describe('PriceFilterComponent', () => {
  let component: PriceFilterComponent;
  let fixture: ComponentFixture<PriceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceFilterComponent],
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://example.com/api' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
