import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import {CommonModule, CurrencyPipe, IMAGE_CONFIG, NgIf, NgOptimizedImage} from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterLink } from '@angular/router';
import {FormsModule} from "@angular/forms";

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
        CurrencyPipe,
        SharedModule,
        NgOptimizedImage,
      FormsModule,
      CommonModule,
        RouterLink,
        NgOptimizedImage,
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: Product = {} as Product;
  @Output() deleteProduct = new EventEmitter<string>();
  userIsAdmin = false;
  base64Background: string;
  constructor() {
    this.base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5v'
  }

  handleDeleteProduct(): void {
    this.deleteProduct.emit(this.product.uuid);
  }
}
