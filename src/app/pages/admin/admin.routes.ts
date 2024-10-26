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
      }
    ]
  }
  ]

