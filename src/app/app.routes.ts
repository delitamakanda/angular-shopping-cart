import { Routes } from "@angular/router";
import {ProductsComponent} from "./core/features/products/products.component";
import {productResolver} from "./core/resolvers/product.resolver";

export const routes: Routes = [
    {
        path: '',
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      children: [
        {
          path: '',
          component: ProductsComponent
        },
        {
          path: 'product/:uuid',
          loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent),
          resolve: {
            productData: productResolver
          }
        },
      ]
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(m => m.routes),
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
