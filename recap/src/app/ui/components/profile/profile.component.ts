import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/models/userDetail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetail:UserDetail={email:localStorage.getItem("email"),userFullName:localStorage.getItem("fullname"),userOperationClaim:localStorage.getItem("role"),
  userId:Number(localStorage.getItem("userId")),userName:"",userLastName:""}
 
  constructor() { }

  ngOnInit(): void {
   

}
}