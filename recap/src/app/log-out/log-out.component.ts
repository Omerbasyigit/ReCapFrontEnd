import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    
      this.toastrService.info("Çıkış işlemi başarılı")
      this.authService.logOut()
      this.router.navigate([""])
  }
}
