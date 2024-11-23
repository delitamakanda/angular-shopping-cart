import {Component, inject, OnInit} from '@angular/core';
import {filter} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {Product} from "../../core/interfaces/product.interface";
import { CurrencyPipe, IMAGE_CONFIG, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-product',
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeHolderResolution: 40,
      }
    }
  ],
    imports: [
        NgIf,
        CurrencyPipe,
      NgOptimizedImage,
    ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: Product;
  base64Background: string;

  constructor() {
    this.base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5v'
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data['productData']);
      this.productService.getById(data['productData'].uuid).pipe(
        filter(product =>!!product),
      ).subscribe((product) => {
          this.product = product;
      })
    })
  }
}
