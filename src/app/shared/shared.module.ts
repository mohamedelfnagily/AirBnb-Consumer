import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonValuesPipe } from '../employee/pipes/json-values.pipe';





@NgModule({
  declarations: [
    JsonValuesPipe,
  ],

  imports: [
    CommonModule,
  ],
  exports:[JsonValuesPipe]
})
export class SharedModule { }
