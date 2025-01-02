import {CommonModule, NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvatarComponent } from './avatar/avatar.component';
import {SearchBarComponent} from "../search-bar/search-bar/search-bar.component";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-navbar',
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        AvatarComponent,
        SearchBarComponent,
      NgIf,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchInput = '';
  authService = inject(AuthService);

  search(): void {
    console.log(`Searching for: ${this.searchInput}`);
  }

}
