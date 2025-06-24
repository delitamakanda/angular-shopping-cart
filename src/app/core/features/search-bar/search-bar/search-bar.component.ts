import {Component, inject, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ProductService} from "../../../services/product.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
    selector: 'app-search-bar',
    template: `
    <form class="form-inline my-2 my-lg-0">
      <mat-form-field>
      <input matInput [formControl]="searchControl"
             class="form-control me-2"
             placeholder="Search products..."
             type="search"/>
      </mat-form-field>
    </form>
  `
})
export class SearchBarComponent implements OnInit {
  searchControl: FormControl = new FormControl<string>('');
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.productService.setSearchValue(value as string);
    });
  }

}
