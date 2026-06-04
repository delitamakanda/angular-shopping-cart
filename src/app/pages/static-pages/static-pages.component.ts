import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {MatCardModule} from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';
import {StaticPagesStoreService} from "./state/static-pages.store.service";
import {CommonObservableDestruction} from "../../shared/helpers/common.observable";
import {MatProgressBar} from "@angular/material/progress-bar";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-static-pages',
  imports: [
    MatCardModule,
    MatProgressBar
  ],providers: [StaticPagesStoreService],
  templateUrl: './static-pages.component.html',
  styleUrl: './static-pages.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class StaticPagesComponent extends CommonObservableDestruction implements OnInit{
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(StaticPagesStoreService);

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.store.fetchPage(`${params["page"]}`)),
      this.untilDestroyed()
    ).subscribe();
  }
}
