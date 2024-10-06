import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar',
  standalone: true
})
export class AvatarPipe implements PipeTransform {

  transform(img: string, defaultImageName: string = 'identicon'): string {
    return img || `https://www.gravatar.com/avatar?d=${defaultImageName}`;
  }

}
