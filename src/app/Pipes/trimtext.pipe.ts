import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimtext'
})
export class TrimtextPipe implements PipeTransform {

  transform(value: string, charactersToTrim:number): unknown {
    return value.substring(0,charactersToTrim)+'...';
  }

}
