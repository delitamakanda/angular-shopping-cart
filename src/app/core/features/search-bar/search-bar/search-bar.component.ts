import {Component, inject, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ProductStoreService} from "../../../state/product.store.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  providers: [
    ProductStoreService,
  ],
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
  readonly store = inject(ProductStoreService);
  protected searchControl: FormControl = new FormControl<string>('');

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.store.setSearchValue(value as string);
    });
  }

}
