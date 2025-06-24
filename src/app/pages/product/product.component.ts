import {Component, inject, OnInit} from '@angular/core';
import {filter} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {Product} from "../../core/interfaces";
import {CommonModule, CurrencyPipe, IMAGE_CONFIG, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {CartService} from "../../core/services/cart.service";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmDirective} from "../../shared/directives/confirm.directive";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CommentsComponent} from "../../core/features/comments/comments.component";
import {RateComponent} from "../../shared/components/rate/rate.component";
import {FormsModule} from "@angular/forms";

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
    CommonModule,
    CurrencyPipe,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    ConfirmDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommentsComponent,
    RateComponent,
    FormsModule,
  ],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  cartService = inject(CartService);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: Product;
  base64Background: string;
  quantity = 1;
  choices = Array.from({length: 10}, (_, i) => i + 1);
  isCommentsVisible = false;
  rating = 0;

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

  toggleComments(): void {
    this.isCommentsVisible = !this.isCommentsVisible;
  }
}
