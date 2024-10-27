import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import { SearchBarComponent } from './search-bar.component';
import { ProductService } from '../../../services/product.service';
import { provideHttpClient} from "@angular/common/http";
import { API_URL } from 'src/app/constants';

describe('SearchBarComponent', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let apiUrl: string;
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: 'https://example.com/api' }  // Replace with actual API URL in your app
      ],
      imports: [SearchBarComponent]
    })
    .compileComponents();

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    apiUrl = TestBed.inject(API_URL);

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
