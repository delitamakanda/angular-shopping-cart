import {IMAGE_CONFIG, NgOptimizedImage, NgStyle} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
    selector: 'app-avatar',
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeHolderResolution: 40,
      }
    }
  ],
  imports: [
    SharedModule,
    NgStyle,
    RouterLink,
    NgOptimizedImage,
  ],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  openMenu = false;
  @Input() imgUrl = '';
  authService = inject(AuthService);
  router = inject(Router);

  disconnect(): void {
    this.authService.logout().subscribe({
      complete: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleMenu(): void {
    this.openMenu =!this.openMenu;
  }

}
