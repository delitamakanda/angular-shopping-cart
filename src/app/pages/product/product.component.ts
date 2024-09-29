import { Component } from '@angular/core';
import { ProductsComponent } from 'src/app/core/features/products/products.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {}
