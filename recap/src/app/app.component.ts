import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="recap"
  fullName:string
  
  constructor(public authService:AuthService){
    authService.isAuthenticated();
    authService.isAdmin();
    
  }
  
  isLocalStorageEmpty(){
    if(sessionStorage.getItem("token")==null){
      this.fullName=""
      return true
    }
    else{
      this.fullName=localStorage.getItem("fullname")
      return false
    }
  }

}
