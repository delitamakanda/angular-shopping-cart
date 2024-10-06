import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    SharedModule,
    NgStyle,
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  openMenu = false;
  @Input() imgUrl!: string;

}
