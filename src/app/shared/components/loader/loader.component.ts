import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressSpinnerModule,
  ],
  standalone: true,
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

}
