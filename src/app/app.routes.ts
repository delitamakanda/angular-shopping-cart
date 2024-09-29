import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path: 'product',
        loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '*',
        loadChildren: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
