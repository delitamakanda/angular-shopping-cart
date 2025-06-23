import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {distinctUntilChanged, throwError} from "rxjs";
import {CommonObservableDestruction} from "../../../shared/helpers/common.observable";

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
export class PriceFilterComponent extends CommonObservableDestruction implements OnInit{
  minPrice: number = 0 ;
  maxPrice: number = 1000;
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  priceFilterForm!: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.priceFilterForm = this.fb.group({
      minPrice: [+this.productService.minPrice || ''],
      maxPrice: [+this.productService.maxPrice || '']
    });

    this.priceFilterForm.valueChanges.pipe(
      distinctUntilChanged(),
      this.untilDestroyed()
    ).subscribe({
      next: ({ minPrice, maxPrice }) => {
        this.productService.minPrice.set(<string>minPrice?.toString() || '');
        this.productService.maxPrice.set(<string>maxPrice?.toString() || '');
      },
      error: (error) => throwError(() => error),
    })
  }
}
