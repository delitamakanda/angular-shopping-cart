import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ProductsComponent} from "./products.component";
import { provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {HttpClient, provideHttpClient, withFetch} from "@angular/common/http";
import {API_URL} from "../../../constants";
import {routes} from "../../../app.routes";
import {ProductService} from "../../services/product.service";
import {ProductServiceMock} from "../../services/product.service.spec";
import {of} from "rxjs";

describe('ProductsComponent',
  () => {
    let fixture: ComponentFixture<ProductsComponent>;
    let component: ProductsComponent;
    let el: HTMLElement;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      await TestBed.configureTestingModule({
        imports: [ProductsComponent],
        providers: [
          provideRouter(routes),
          provideHttpClient(withFetch()),
          provideHttpClientTesting(),
          {
            provide: HttpClient, useValue: httpClientSpy  // Mock the HttpClient for testing purposes
          },
          {
            provide: ProductService, useClass: ProductServiceMock,  // Mock the ProductService for testing purposes
          },
          { provide: API_URL, useValue: 'https://example.com/api' }, // Replace with actual API URL in your app
        ]
      }).compileComponents();

      httpClientSpy.get.and.returnValue(
        of([
          { id: 1, name: 'Product 1', price: 10, category: 'Electronics' },
          { id: 2, name: 'Product 2', price: 20, category: 'Computers' },
          { id: 3, name: 'Product 3', price: 30, category: 'Clothing' }
        ])
      )

      fixture = TestBed.createComponent(ProductsComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    })

    it('should display a list of products', () => {
      const productList = el.querySelectorAll('app-card');
      const nbProducts = component.products().length;
      expect(nbProducts).toBe(3);
      expect(productList.length).toBe(nbProducts);
    })

});
