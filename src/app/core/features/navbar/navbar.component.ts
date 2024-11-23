import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import {SearchBarComponent} from "../search-bar/search-bar/search-bar.component";

@Component({
    selector: 'app-navbar',
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        AvatarComponent,
        SearchBarComponent,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchInput = '';

  search(): void {
    console.log(`Searching for: ${this.searchInput}`);
  }

}
