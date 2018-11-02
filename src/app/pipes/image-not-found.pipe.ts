import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageNotFound'
})
export class ImageNotFoundPipe implements PipeTransform {

  transform(images: any[]): any {
    return (!images || images.length <= 0) ? 'assets/img/noimage.png' : images[0].url;
  }

}
