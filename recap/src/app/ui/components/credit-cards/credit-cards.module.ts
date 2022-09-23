import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardsComponent } from './credit-cards.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreditCardsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:"",component:CreditCardsComponent}
    ])

  ]
})
export class CreditCardsModule { }
