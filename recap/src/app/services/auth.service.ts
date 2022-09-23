import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserDetail } from '../models/userDetail';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  role:string
  apiUrl="https://localhost:44326/api/"
  constructor(private httpClient:HttpClient) { }


  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }
  isAuthenticated(){
    if(sessionStorage.getItem("token")&&localStorage.getItem("userId")&&localStorage.getItem("email")
    &&localStorage.getItem("fullname")&&localStorage.getItem("expiration")){
      
      return true;
    }
    else{
      
      return false;
    }
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel)
  }
  getUser(userId:number):Observable<SingleResponseModel<UserDetail>>{
    let newPath=this.apiUrl+"auth/getuser?userId="+userId
    return this.httpClient.get<SingleResponseModel<UserDetail>>(newPath)
  }

  logOut() {
    sessionStorage.clear();
    localStorage.clear();
    
    
  }
  getRole(){
    this.role=localStorage.getItem("role")
    return this.role;
  }
  isAdmin(){
    if(this.getRole()=="admin"){
      return true
    }
    return false
  }
}
