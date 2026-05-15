import {Component, effect, inject, OnInit} from '@angular/core';

import {MatCardModule} from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';
import {StaticPagesStoreService} from "./state/static-pages.store.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CommonObservableDestruction} from "../../shared/helpers/common.observable";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-static-pages',
  imports: [
    MatCardModule,
    MatProgressBar
  ],providers: [StaticPagesStoreService],
  templateUrl: './static-pages.component.html',
  styleUrl: './static-pages.component.scss',
  standalone: true,
})
export class StaticPagesComponent extends CommonObservableDestruction implements OnInit{
  protected readonly store = inject(StaticPagesStoreService);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.fetchPage(`${params["page"]}`)
        .pipe(
        this.untilDestroyed()
      ).subscribe()
    });
  }
}
