import {Component, inject, OnInit} from '@angular/core';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {PaginationComponent} from "../pagination/pagination.component";
import {Product} from "../../interfaces";
import {SearchBarComponent} from "../search-bar/search-bar/search-bar.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {CommonObservableDestruction} from "../../../shared/helpers/common.observable";
import {PriceFilterComponent} from "../price-filter/price-filter.component";
import {SortByComponent} from "../sort-by/sort-by.component";
import { ProductStoreService } from '../../state/product.store.service';

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
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends CommonObservableDestruction implements OnInit {
  readonly store = inject(ProductStoreService);
  
  protected breakpointsCols = 4

  constructor(private breakpointsObs: BreakpointObserver) {
    super();
  }

  ngOnInit() : void{
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
