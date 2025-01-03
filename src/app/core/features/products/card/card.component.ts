import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import {CurrencyPipe, IMAGE_CONFIG, NgIf, NgOptimizedImage} from '@angular/common';
import { CommentsComponent } from '../../comments/comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';
import {RateComponent} from "../../../../shared/components/rate/rate.component";
import {FormsModule} from "@angular/forms";
import {CartService} from "../../../services/cart.service";

@Component({
    selector: 'app-card',
    providers: [
        {
            provide: IMAGE_CONFIG,
            useValue: {
                placeHolderResolution: 40,
            }
        }
    ],
    imports: [
        ProductCardComponent,
        CommentsComponent,
        CurrencyPipe,
        SharedModule,
        NgOptimizedImage,
      FormsModule,
      NgIf,
        RouterLink,
        NgOptimizedImage,
      RateComponent,
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: Product = {} as Product;
  @Output() deleteProduct = new EventEmitter<string>();
  userIsAdmin = false;
  isCommentsVisible = false;
  base64Background: string;
  rating = 0;
  cartService = inject(CartService);

  constructor() {
    this.base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5v'
  }

  handleDeleteProduct(): void {
    this.deleteProduct.emit(this.product.uuid);
  }


  toggleComments(): void {
    this.isCommentsVisible =!this.isCommentsVisible;
  }
}
