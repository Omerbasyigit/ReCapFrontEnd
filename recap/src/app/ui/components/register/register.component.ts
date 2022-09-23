import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userDetail:UserDetail
  registerModel:RegisterModel
  registerAddForm:FormGroup
  constructor(private authService:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterAddForm();
    this.getUser();
  }

  createRegisterAddForm(){
    this.registerAddForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  register(){
    if(this.registerAddForm.valid){
      let registerModel=Object.assign({},this.registerAddForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        sessionStorage.setItem("token",response.data.token)
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("fullname",response.data.fullName)
        localStorage.setItem("expiration",response.data.expiration)
        localStorage.setItem("userId",response.data.userId.toString())
        this.toastrService.success(response.message)
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for(let i=0;i<responseError.error.ValidationErrors.length;i++){
           this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage)
           console.log(responseError)
          }
        }
      })
     }else{
       this.toastrService.error("Lütfen boş alanları doldurunuz.")
     }
    }
  getUser(){
    if(this.authService.isAuthenticated()){
      this.authService.getUser(Number(localStorage.getItem("userId"))).subscribe(response=>{
        this.userDetail=response.data
      })
    }
  }
}
