import { AfterContentInit, Component, ContentChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="product-card card d-flex flex-column align-items-center">
      <ng-content></ng-content>
    </div>
  `,
})
export class ProductCardComponent implements AfterContentInit {
  @ContentChild('name') productName!: ElementRef;
  @ContentChild('price') productPrice!: ElementRef;

  ngAfterContentInit(): void {
    // Perform any necessary initialization or setup here
  }
}
