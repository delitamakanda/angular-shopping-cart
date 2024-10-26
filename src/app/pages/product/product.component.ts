import {Component, inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data['productData']);
    })
  }
}
