import {Component, effect, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../services/product.service';
import {AsyncPipe} from "@angular/common";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    SharedModule,
    PaginationComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productService = inject(ProductService);
  products = this.productService.products;
  filterCategory = '';
  propCategories = ['Electronics', 'Computers', 'Clothing', 'Accessories', 'Smartphones'];

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
