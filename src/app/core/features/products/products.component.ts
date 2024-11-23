import {Component, effect, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../services/product.service';
import {PaginationComponent} from "../pagination/pagination.component";
import {Product} from "../../interfaces/product.interface";

@Component({
    selector: 'app-products',
    imports: [
        CardComponent,
        SharedModule,
        PaginationComponent,
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productService = inject(ProductService);
  products = this.productService.products;
  filterCategory = '';
  propCategories = ['Electronics', 'Computers', 'Clothing', 'Accessories', 'Smartphones'];

  get allProducts(): Product[] {
    return this.products();
  }

  constructor() {
    effect(() => {
      this.productService.getAll()
        .subscribe();
    });
  }

  removeProduct(uuid: string): void {
    this.productService.removeById(uuid);
  }

}
