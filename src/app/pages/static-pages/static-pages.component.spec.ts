import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPagesComponent } from './static-pages.component';
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('StaticPagesComponent', () => {
  let component: StaticPagesComponent;
  let fixture: ComponentFixture<StaticPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticPagesComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { params: of({ page: 'terms' }) } },
        { provide: HttpClient, useValue: { get: () => of('<html><body>Terms and Conditions</body></html>') } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display the static page content', () => {
    expect(component.encodedHtml).toBe('<html><body>Terms and Conditions</body></html>');
  })
});
