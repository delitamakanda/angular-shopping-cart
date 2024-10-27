import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {ProductService} from "./core/services/product.service";
import {API_URL} from "./constants";
import {NavbarComponent} from "./core/features/navbar/navbar.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent, // Import the standalone component
        NavbarComponent, // Mock child components if needed
      ],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: API_URL, useValue: 'https://example.com/api'}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
