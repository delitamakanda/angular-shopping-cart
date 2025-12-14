import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";

import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {distinctUntilChanged, filter, throwError} from "rxjs";
import {CommonObservableDestruction} from "../../../shared/helpers/common.observable";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-price-filter',
  imports: [
    MatInputModule,
    ReactiveFormsModule
],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss',
  standalone: true
})
export class PriceFilterComponent extends CommonObservableDestruction implements OnInit{
  minPrice: number = 0 ;
  maxPrice: number = 1000;
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  priceFilterForm!: FormGroup;
  router = inject(Router);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.priceFilterForm = this.fb.group({
      minPrice: [this.minPrice],
      maxPrice: [this.maxPrice]
    });

    this.priceFilterForm.get('minPrice')?.valueChanges.pipe(
      distinctUntilChanged(),
      this.untilDestroyed()
    ).subscribe({
      next: (value) => {
          this.priceFilterForm.get('minPrice')?.setValue(value, {emitEvent: false});
          this.productService.minPrice.set(value );
      },
      error: (error) => throwError(() => error),
    });

    this.priceFilterForm.get('maxPrice')?.valueChanges.pipe(
      distinctUntilChanged(),
      this.untilDestroyed()
    ).subscribe({
      next: (value) => {
          this.priceFilterForm.get('maxPrice')?.setValue(value, {emitEvent: false});
          this.productService.maxPrice.set(value );
      },
      error: (error) => throwError(() => error),
    });

    // reset the filter when the user navigates to a new page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      this.untilDestroyed()
    ).subscribe(() => {
      this.priceFilterForm.get('minPrice')?.setValue(this.minPrice, { emitEvent: false });
      this.priceFilterForm.get('maxPrice')?.setValue(this.maxPrice, { emitEvent: false });
      this.productService.minPrice.set('' );
      this.productService.maxPrice.set('' );
    });

  }
}
