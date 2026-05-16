import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {ProductsComponent} from "./products.component";
import { provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {API_URL} from "../../../constants";
import {routes} from "../../../app.routes";
import {ProductService} from "../../services/product.service";
import {ProductServiceMock} from "../../services/product.service.spec";
import {of} from "rxjs";
import { ProductStoreService } from 'src/app/core/state/product.store.service';
import { signal } from "@angular/core";
import { Category, Product } from "../../interfaces";
import { BreakpointObserver } from "@angular/cdk/layout";

describe('ProductsComponent',
  () => {
    let fixture: ComponentFixture<ProductsComponent>;
    let component: ProductsComponent;
    let el: HTMLElement;
    let mockStore: any;
    let mockBreakpointObserver: any;

    beforeEach(async () => {
      mockBreakpointObserver = jasmine.createSpyObj('BreakpointObserver', ['observe']);
      mockBreakpointObserver.observe.and.returnValue(of({
        matches: false,
        breakpoints: {
          '(max-width: 599.99px)': true,
          '(min-width: 600px) and (max-width: 959.99px)': false,
          '(min-width: 960px) and (max-width: 1279.99px)': false,
          '(min-width: 1280px) and (max-width: 1919.99px)': false,
          '(min-width: 1920px)': false,
        }
      }));

      mockStore = {
        categories: signal<Category[]>([
          { name: 'Electronics', uuid: '1' },
          { name: 'Computers', uuid: '2' },
          { name: 'Clothing', uuid: '3' },
        ] as Category[]),
        products: signal([
          { 
            uuid: '1', 
            name: 'Product 1', 
            price: 10, 
            category: ['Electronics'],
            description: 'Test product 1',
            image_url: 'test1.jpg',
            slug: 'product-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          { 
            uuid: '2', 
            name: 'Product 2', 
            price: 20, 
            category: ['Computers'],
            description: 'Test product 2',
            image_url: 'test2.jpg',
            slug: 'product-2',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          { 
            uuid: '3', 
            name: 'Product 3', 
            price: 30, 
            category: ['Clothing'],
            description: 'Test product 3',
            image_url: 'test3.jpg',
            slug: 'product-3',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
        ] as Product[]),
        loading: signal(false),
        searchValue: signal(''),
        sortBy: signal('default'),
        totalCount: signal(3),
        limit: signal(10),
        offset: signal(0),
        hasPreviousPage: signal(false),
        hasMorePage: signal(false),
        product: signal(null),
        error: signal(null),
        category: signal(''),
        minPrice: signal(0),
        maxPrice: signal(Infinity),
        ordering: signal('default'),
        loadProducts: jasmine.createSpy('loadProducts'),
        loadProductById: jasmine.createSpy('loadProductById').and.returnValue(of(null)),
        setSearchValue: jasmine.createSpy('setSearchValue'),
        setCategory: jasmine.createSpy('setCategory'),
        setMinPrice: jasmine.createSpy('setMinPrice'),
        setMaxPrice: jasmine.createSpy('setMaxPrice'),
        setOrdering: jasmine.createSpy('setOrdering'),
        setLimit: jasmine.createSpy('setLimit'),
        setOffset: jasmine.createSpy('setOffset'),
        nextPage: jasmine.createSpy('nextPage'),
        previousPage: jasmine.createSpy('previousPage'),
        resetFilters: jasmine.createSpy('resetFilters'),
        removeProduct: jasmine.createSpy('removeProduct'),
      };
      await TestBed.configureTestingModule({
        imports: [ProductsComponent],
        providers: [
          provideRouter(routes),
          provideHttpClient(withFetch()),
          provideHttpClientTesting(),
          {
            provide: ProductStoreService, useValue: mockStore,  // Mock the ProductStoreService for testing purposes
          },
          {
            provide: ProductService, useClass: ProductServiceMock,  // Mock the ProductService for testing purposes
          },
          { provide: BreakpointObserver, useValue: mockBreakpointObserver }, // Mock the BreakpointObserver for testing purposes
          { provide: API_URL, useValue: 'https://example.com/api' }, // Replace with actual API URL in your app
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProductsComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should create', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000); // Wait for async operations to complete
      expect(component).toBeTruthy();
    }));

    it('should initialize with default breakpoint columns', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000); // Wait for async operations to complete
      expect(component.breakpointsCols).toBe(4); // Based on the mocked BreakpointObserver response
    }));

});
