import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { BrandFilterPipe } from '../pipes/brand-filter.pipe';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ComponentsModule,
  ]
})
export class AdminModule { }
