import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  user = this.authService.user();

  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('User Profile');
  }

  updateTitleWithUsername(title: string): void {
   this.title.setTitle(`User Profile: ${title}` || 'User Profile');
  }

}
