import {Component, inject} from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ProductStoreService } from '../../state/product.store.service';


@Component({
    selector: 'app-pagination',
    providers: [ProductStoreService],
    styleUrls: ['./pagination.component.scss'],
    imports: [
    MatPaginatorModule
],
    template: `
      <mat-paginator (page)="handlePageEvent($event)" [length]="totalCount" [pageSize]="store.limit()" [pageSizeOptions]="pageSizeOptions" aria-label="Select page">
      </mat-paginator>
  `,
})
export class PaginationComponent {
  readonly store = inject(ProductStoreService);
  protected pageSizeOptions = [5, 10, 25, 100];

  get totalCount(): number {
    return this.store.totalCount();
  }

  handlePageEvent(event: PageEvent): void {
    this.store.setLimit(event.pageSize);
    this.store.goToPage(event.pageIndex);
    this.scrollToTop();
  }

  private scrollToTop(): void {
    requestAnimationFrame(() => {
      window.scrollTo({top: 0, behavior:'smooth'});
    })
  }
}
