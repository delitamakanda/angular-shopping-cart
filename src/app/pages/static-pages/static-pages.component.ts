import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import {CommonObservableDestruction} from "../../shared/helpers/common.observable";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-static-pages',
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './static-pages.component.html',
  styleUrl: './static-pages.component.scss',
  standalone: true,
})
export class StaticPagesComponent extends CommonObservableDestruction implements OnInit{
  encodedHtml!: string;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.httpClient.get(`assets/legal/fr/${params["page"]}.html`, {responseType: 'text'})
        .pipe(
          catchError(() => of('Error fetching static page')),
        this.untilDestroyed()
      )
       .subscribe(response => {
          this.encodedHtml = response;
        });
    });
  }
}
