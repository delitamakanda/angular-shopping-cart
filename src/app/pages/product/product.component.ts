import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {combineLatest} from "rxjs";
import {map, filter} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Category, Product} from "../../core/interfaces";
import { CommonModule, CurrencyPipe, IMAGE_CONFIG, NgOptimizedImage } from "@angular/common";
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
import { ProductStoreService } from 'src/app/core/state/product.store.service';

@Component({
    selector: 'app-product',
    standalone: true,
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeHolderResolution: 40,
      }
    },
    ProductStoreService,
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
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(ProductStoreService);
  
  protected base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5v';
  protected quantity = 1;
  protected choices = Array.from({length: 10}, (_, i) => i + 1);
  protected isCommentsVisible = false;
  protected rating = 0;


  ngOnInit() {
    this.route.data.pipe(
      map(data => data['productData'])
    ).subscribe(productData => {
      console.log(productData);
      this.store.loadProductById(productData.uuid);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.cartService.updateCartItemQuantity(product.uuid, this.quantity);
  }

  toggleComments(): void {
    this.isCommentsVisible = !this.isCommentsVisible;
  }
}
