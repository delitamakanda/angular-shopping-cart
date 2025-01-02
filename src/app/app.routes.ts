import { Routes, ResolveFn } from "@angular/router";
import {ProductsComponent} from "./core/features/products/products.component";
import {productResolver} from "./core/resolvers/product.resolver";
import {map, Observable} from "rxjs";
import {ProductService} from "./core/services/product.service";
import {inject} from "@angular/core";

const productDetails: ResolveFn<string> = (route, state): Observable<string> => {
  const productService = inject(ProductService);
  return  productService.getById(route.params['uuid']).pipe(map(product => product.name));
}

export const routes: Routes = [
    {
        path: '',
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
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
      title: 'Not Found',
    }
];
