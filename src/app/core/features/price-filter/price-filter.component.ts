import {Component, inject} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {min} from "rxjs";

@Component({
  selector: 'app-price-filter',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
  standalone: true
})
export class PriceFilterComponent {
  minPrice: number = 0;
  maxPrice: number = 1000;
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  priceFilterForm = this.fb.group({
    minPrice: [this.minPrice],
    maxPrice: [this.maxPrice]
  });

  onPriceChange(): void {
    // Update product list based on new price range
    // this.productService.setPriceRange(this.priceFilterForm.value);
  }

  protected readonly min = min;
}
