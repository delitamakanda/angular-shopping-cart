import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/core/interfaces/product.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-card',
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeHolderResolution: 40,
      },
    },
  ],
  imports: [
    ProductCardComponent,
    CurrencyPipe,
    SharedModule,
    NgOptimizedImage,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) product!: Product;
  @Output() deleteProduct = new EventEmitter<string>();

  readonly userIsAdmin = false;
  readonly base64Background = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5v';

  handleDeleteProduct(): void {
    this.deleteProduct.emit(this.product.uuid);
  }
}
