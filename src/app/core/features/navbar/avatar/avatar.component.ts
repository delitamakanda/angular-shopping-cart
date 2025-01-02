import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-avatar',
    imports: [
        SharedModule,
        NgStyle,
      RouterLink,
    ],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  openMenu = false;
  @Input() imgUrl!: string;

}
