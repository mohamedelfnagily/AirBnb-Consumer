import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonValues'
})
export class JsonValuesPipe implements PipeTransform {

  transform(value: object[]|null,key:string): any {
  let languages:string="";

  value?.forEach(element => {
   let x= Object.values(element);
   console.log(x[0]);
   languages+=x[0]+","
  });
    
    return languages.substring(0,languages.length-1);
  }

}
