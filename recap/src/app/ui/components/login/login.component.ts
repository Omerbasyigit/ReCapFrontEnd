import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { LoginModel } from 'src/app/models/loginModel';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  customer:Customer
  userDetail:UserDetail
  loginModel:LoginModel
  loginAddForm:FormGroup
  constructor(private authService:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder,private router:Router,){}

  ngOnInit(): void {
    this.createLoginAddForm();
  }


  createLoginAddForm(){
    this.loginAddForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if(this.loginAddForm.valid){
      let loginModel=Object.assign({},this.loginAddForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        sessionStorage.setItem("token",response.data.token)
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("fullname",response.data.fullName)
        localStorage.setItem("expiration",response.data.expiration)
        localStorage.setItem("userId",response.data.userId.toString())
        this.toastrService.success("Giriş Başarılı")
        this.getUser()
        this.router.navigate([""])
      },responseError=>{
        this.toastrService.error(responseError.error)
        
      })
    }else{this.toastrService.error("Lütfen boş alanları doldurunuz")}
  }
  getUser(){
    if(this.authService.isAuthenticated()){
      this.authService.getUser(Number(localStorage.getItem("userId"))).subscribe(response=>{
        this.userDetail=response.data
        localStorage.setItem("role",this.userDetail.userOperationClaim)
      })
    }
  }


}
