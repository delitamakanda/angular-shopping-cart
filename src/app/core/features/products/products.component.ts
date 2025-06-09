import {Component, effect, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../services/product.service';
import {PaginationComponent} from "../pagination/pagination.component";
import {Product} from "../../interfaces/product.interface";
import {SearchBarComponent} from "../search-bar/search-bar/search-bar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CategoryListComponent} from "./category-list/category-list.component";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
    selector: 'app-products',
  imports: [
    CardComponent,
    SharedModule,
    PaginationComponent,
    SearchBarComponent,
    MatProgressSpinnerModule,
    CategoryListComponent,
    MatGridListModule,
  ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productService = inject(ProductService);
  products = this.productService.products;
  isLoading = false;
  // filterCategory = '';
  // propCategories = ['Electronics', 'Computers', 'Clothing', 'Accessories', 'Smartphones'];

  get allProducts(): Product[] {
    return this.products();
  }

  constructor() {
    effect(() => {
      this.isLoading = true;
      this.productService.getAll()
        .subscribe();
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  removeProduct(uuid: string): void {
    this.productService.removeById(uuid);
  }

}
