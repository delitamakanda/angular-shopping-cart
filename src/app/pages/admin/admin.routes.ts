import { Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import  { authGuard } from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'create',
        component: CreateProductComponent,
        canActivate: [authGuard]
      },
      {
        path: 'orders',
        loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      }
    ]
  }
  ]

