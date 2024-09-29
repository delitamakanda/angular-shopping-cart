import { AfterContentInit, Component, ContentChild, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="product-card card d-flex flex-column align-items-center">
      <ng-content></ng-content>
    </div>
  `,
})
export class ProductCardComponent implements AfterContentInit {
  @ContentChild('name') productName!: ElementRef;
  @ContentChild('description') productDescription!: QueryList<ElementRef>;
  @ContentChild('price') productPrice!: ElementRef;

  ngAfterContentInit(): void {
    // Perform any necessary initialization or setup here
  }
}
