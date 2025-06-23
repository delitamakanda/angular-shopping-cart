import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Subscription} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-sort-by',
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './sort-by.component.html',
  styleUrl: './sort-by.component.scss',
  standalone: true
})
export class SortByComponent implements OnInit, OnDestroy {
  sortOptions = [
    {value: 'default', viewValue: 'Default' },
    {value: 'price', viewValue: 'Price (asc.)'},
    {value: '-price', viewValue: 'Price (desc.)'},
    { value: '-created', viewValue: 'New items'},
  ];
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  sortByForm = this.fb.group({
    sortBy: ['default']
  });
  private routerSubscription: Subscription | null = null;
  private previousCategory: string | null = null;

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const urlParams = new URLSearchParams(currentUrl.split('?')[1] || '');
    const sortByParam = urlParams.get('sort') || 'default';

    this.sortByForm.get('sortBy')?.setValue(sortByParam, { emitEvent: false });

    this.sortByForm.get('sortBy')?.valueChanges.subscribe((value) => {
      this.onSortChange(value);
    });

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentCategory = this.route.snapshot.queryParamMap.get('category');
      if (this.previousCategory!== currentCategory) {
        this.sortByForm.get('sortBy')?.setValue('default', { emitEvent: false });
        if (this.route.snapshot.queryParamMap.has('sort')) {
          this.router.navigate([], { queryParams: { sort: null }, queryParamsHandling:'merge' });
        }
      }
      this.previousCategory = currentCategory;
      const sortByParam = this.route.snapshot.queryParamMap.get('sort') || 'default';
      this.productService.ordering.set(sortByParam === 'default' ? '' : sortByParam);
      this.sortByForm.get('sortBy')?.setValue(sortByParam, { emitEvent: false });
    })
  }


  async onSortChange(value: string | null): Promise<void> {
    if (value === null) {
      this.sortByForm.get('sortBy')?.setValue('default', { emitEvent: false });
      value = 'default';
    }

    await this.router.navigate([], {
      queryParams: { sort: value === 'default' ? null : value },
      queryParamsHandling: 'merge'
    })
  }

  ngOnDestroy() : void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
