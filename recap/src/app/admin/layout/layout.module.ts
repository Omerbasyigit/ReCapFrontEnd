import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';




@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    MatListModule,
    MatSidenavModule,
    CommonModule,
    ComponentsModule,
    RouterModule,
    
  ],
  exports:[LayoutComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
