import {Component, inject, OnInit} from '@angular/core';
import {filter} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {Product} from "../../core/interfaces/product.interface";
import {CurrencyPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: Product;

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
