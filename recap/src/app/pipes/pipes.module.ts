import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandFilterPipe } from './brand-filter.pipe';
import { CarFilterPipe } from './car-filter.pipe';
import { ColorFilterPipe } from './color-filter.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BrandFilterPipe,CarFilterPipe,ColorFilterPipe],
  imports: [
    CommonModule,
    
  ],
  exports:[
    BrandFilterPipe,CarFilterPipe,ColorFilterPipe,FormsModule,CommonModule
  ]
})
export class PipesModule { }
