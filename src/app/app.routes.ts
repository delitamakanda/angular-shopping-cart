import { Routes, ResolveFn, UrlMatcher } from "@angular/router";
import {ProductsComponent} from "./core/features/products/products.component";
import {productResolver} from "./core/resolvers/product.resolver";
import {map, Observable, of} from "rxjs";
import {ProductService} from "./core/services/product.service";
import {inject} from "@angular/core";
import {DEFAULT_LOCALE, SUPPORTED_LOCALES} from "./constants";

const productDetails: ResolveFn<string> = (route, state): Observable<string> => {
  const productService = inject(ProductService);
  return  productService.getById(route.params['uuid']).pipe(map(product => product.name));
}

const staticPages: ResolveFn<string> = (route, state): Observable<string> => {
  return of('Static Page');
}

// Matches a leading /fr, /en, /ko, ... segment and exposes it as the 'locale' route param.
const localeMatcher: UrlMatcher = (segments) => {
  const [first] = segments;
  if (first && (SUPPORTED_LOCALES as readonly string[]).includes(first.path)) {
    return { consumed: [first], posParams: { locale: first } };
  }
  return null;
};

export const routes: Routes = [
  {
    matcher: localeMatcher,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        children: [
          {
            path: '',
            component: ProductsComponent,
            title: 'Products list',
          },
          {
            path: 'cart',
            loadComponent: () => import('./core/features/cart/cart.component').then(m => m.CartComponent),
            title: 'Cart',
          },
          {
            path: 'product/:uuid',
            loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent),
            resolve: {
              productData: productResolver
            },
            title: productDetails,
          },
          {
            path: 'static-pages/:page',
            loadComponent: () => import('./pages/static-pages/static-pages.component').then(m => m.StaticPagesComponent),
            title: staticPages,
          },
          {
            path: '**',
            loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
            title: 'Page Not Found',
          }
        ]
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.routes),
        title: 'Admin Panel',
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
        title: 'Signup',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: DEFAULT_LOCALE,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: DEFAULT_LOCALE
  }
];
