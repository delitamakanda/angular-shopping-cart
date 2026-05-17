import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit} from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {PaginationComponent} from "../pagination/pagination.component";
import {SearchBarComponent} from "../search-bar/search-bar/search-bar.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {PriceFilterComponent} from "../price-filter/price-filter.component";
import {SortByComponent} from "../sort-by/sort-by.component";
import { ProductStoreService } from '../../state/product.store.service';
import { CommonObservableDestruction } from 'src/app/shared/helpers/common.observable';

@Component({
    selector: 'app-products',
  imports: [
    CardComponent,
    SharedModule,
    PaginationComponent,
    SearchBarComponent,
    CategoryListComponent,
    MatGridListModule,
    PriceFilterComponent,
    SortByComponent,
  ],
  providers: [
    ProductStoreService,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent extends CommonObservableDestruction implements OnInit {
  private readonly breakpointsObs = inject(BreakpointObserver);
  readonly store = inject(ProductStoreService);
  readonly cdr = inject(ChangeDetectorRef);
  
  public breakpointsCols = 4

  constructor() {
    super();
    effect(() => {
      const params = {
        limit: this.store.limit(),
        q: this.store.searchValue(),
        offset: this.store.offset(),
        ordering: this.store.ordering(),
        category_name_in: this.store.category(),
        min_price: this.store.minPrice(),
        max_price: this.store.maxPrice(),
      };
     this.store.loadProducts(params);
    });
  }

  ngOnInit() : void{
    this.store.getCategories();

    this.breakpointsObs.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(this.untilDestroyed()).subscribe((result) => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.breakpointsCols = 1;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.breakpointsCols = 2;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.breakpointsCols = 3;
      } else {
        this.breakpointsCols = 4;
      }
    })
  }

  removeProduct(uuid: string): void {
    this.store.removeProduct(uuid);
  }

}
