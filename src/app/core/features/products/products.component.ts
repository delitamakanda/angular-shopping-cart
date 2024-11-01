import {Component, effect, inject, OnInit} from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductService } from '../../services/product.service';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    SharedModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  private productService = inject(ProductService);
  products = this.productService.productsSearched;
  filterCategory = '';
  propCategories = ['Electronics', 'Computers', 'Clothing', 'Accessories', 'Smartphones'];

  constructor() {
    effect(() => {
      // Implement your own filter logic here
    });
  }
  ngOnInit(): void {
    this.productService.getAll()
    .subscribe();
  }


  removeProduct(uuid: string): void {
    this.productService.removeById(uuid);
  }

}
