import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { LogOutComponent } from './log-out/log-out.component';
import { ColorDirective } from './directives/color.directive';






@NgModule({
  declarations: [
    AppComponent,
    LogOutComponent,
    ColorDirective,
    

  ],
  imports: [
    
    UiModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports:[

  ],

  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
