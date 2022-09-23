import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
   
  constructor(  private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router){
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let role=this.authService.getRole();
      if (this.authService.isAuthenticated()&&role=="admin") {
        
        return true
        }
        else if(role=="user"){
          this.toastrService.info("Yetkiniz yok")
          this.router.navigate([""])
         return false
        }
         
        else {
          this.toastrService.info('Sisteme giriş yapmalısınız');
        this.router.navigate(["login"])
        
        return false;
      }
    }  
  }
    
