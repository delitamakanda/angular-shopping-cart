import { Component, ChangeDetectionStrategy } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-home',
    imports: [
        RouterOutlet,
    ],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
