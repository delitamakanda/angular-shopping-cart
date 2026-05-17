import {Component, inject, OnInit} from '@angular/core';

import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {distinctUntilChanged, filter, throwError} from "rxjs";
import {CommonObservableDestruction} from "../../../shared/helpers/common.observable";
import {NavigationEnd, Router} from "@angular/router";
import { ProductStoreService } from '../../state/product.store.service';

@Component({
  selector: 'app-price-filter',
  imports: [
    MatInputModule,
    ReactiveFormsModule
],
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
  standalone: true
})
export class PriceFilterComponent extends CommonObservableDestruction implements OnInit{
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly store = inject(ProductStoreService);
  public minPrice: number = 0 ;
  public maxPrice: number = 1000;
  public priceFilterForm!: FormGroup;
  

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
          this.store.setPriceRange(value, this.priceFilterForm.get('maxPrice')?.value);
      },
      error: (error) => throwError(() => error),
    });

    this.priceFilterForm.get('maxPrice')?.valueChanges.pipe(
      distinctUntilChanged(),
      this.untilDestroyed()
    ).subscribe({
      next: (value) => {
          this.priceFilterForm.get('maxPrice')?.setValue(value, {emitEvent: false});
          this.store.setPriceRange(this.priceFilterForm.get('minPrice')?.value, value);
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
      this.store.setPriceRange(this.minPrice, this.maxPrice);
    });

  }
}
