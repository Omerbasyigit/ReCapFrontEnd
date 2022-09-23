import { UserDetail } from "./userDetail";

export interface TokenModel{
    token:string;
    expiration:string;
    userId:number,
    fullName:string,
    email:string

}