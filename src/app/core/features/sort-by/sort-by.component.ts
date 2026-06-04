import {Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import { ProductStoreService } from '../../state/product.store.service';

@Component({
  selector: 'app-sort-by',
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
],
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class SortByComponent implements OnInit, OnDestroy {
  readonly store = inject(ProductStoreService);
  sortOptions = [
    {value: 'created_at', viewValue: 'Default'},
    {value: 'price', viewValue: 'Price (asc.)'},
    {value: '-price', viewValue: 'Price (desc.)'},
    {value: '-created_at', viewValue: 'New items'},
  ];
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  sortByForm = this.fb.group({
    sortBy: ['-created_at']
  });
  private routerSubscription: Subscription | null = null;
  private previousCategory: string | null = null;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const urlParams = new URLSearchParams(currentUrl.split('?')[1] || '-created_at');
    const sortByParam = urlParams.get('sort') || '-created_at';

    this.sortByForm.get('sortBy')?.setValue(sortByParam, { emitEvent: false });

    this.sortByForm.get('sortBy')?.valueChanges.subscribe((value) => {
      this.onSortChange(value);
    });

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentCategory = this.route.snapshot.queryParamMap.get('category');
      if (this.previousCategory!== currentCategory) {
        this.sortByForm.get('sortBy')?.setValue('-created_at', { emitEvent: false });
        if (this.route.snapshot.queryParamMap.has('sort')) {
          this.router.navigate([], { queryParams: { sort: null }, queryParamsHandling:'merge' });
        }
      }
      this.previousCategory = currentCategory;
      const sortByParam = this.route.snapshot.queryParamMap.get('sort') || '-created_at';
      this.store.setOrdering(sortByParam);
      this.store.setOffset(0);
      this.sortByForm.get('sortBy')?.setValue(sortByParam, { emitEvent: false });
    })
  }


  async onSortChange(value: string | null): Promise<void> {
    if (value === null) {
      this.sortByForm.get('sortBy')?.setValue('-created_at', { emitEvent: false });
      value = '-created_at';
    }
    this.store.setOrdering(value);
    this.store.setOffset(0);
    this.store.loadProducts({
      limit: this.store.limit(),
      q: this.store.searchValue(),
      offset: 0,
      ordering: value,
      category_name_in: this.store.category(),
      min_price: this.store.minPrice(),
      max_price: this.store.maxPrice(),
    });

    await this.router.navigate([], {
      queryParams: { sort: value },
      queryParamsHandling: 'merge'
    })
  }

  ngOnDestroy() : void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
