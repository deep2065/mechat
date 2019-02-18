import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

import { Observable } from  'rxjs/Observable';

import  'rxjs/add/operator/catch';

import  'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class MainappService {
  is_login=false;
  baseUrl:string = "http://103.83.130.169:3001";

  constructor(private  httpClient : HttpClient) { }

  login(username,password,callback)
  {
    this.httpClient.get(this.baseUrl+"/login").subscribe(user=>{
      callback(user);
    });

  }

  sendOtp(mobile,callback)
  {
    this.httpClient.get(this.baseUrl+"/sendotp/"+mobile).subscribe(otp=>{
      callback(otp);
    })
  }

  verifyotp(mobile,otp,callback)
  {
    this.httpClient.get(this.baseUrl+"/verifyotp/"+mobile+"/"+otp).subscribe(verify=>{
      callback(verify);
    })
  }

  signUp(data,callback){
    let header = {header:"Content-type: application/json"};
    this.httpClient.post(this.baseUrl+"/signup",data,{headers:header}).subscribe(rdata=>{
      callback(rdata);
    })
  }

  saveContact(data,callback)
  {
    let header = {header:"Content-type: application/json"};
    this.httpClient.post(this.baseUrl+"/savecontact",data,{headers:header}).subscribe(rdata=>{
      callback(rdata);
    })
  }

  getAllMyFriends(uid,callback)
  {
    this.httpClient.get(this.baseUrl+"/getfriends/"+uid).subscribe(friend=>{
      callback(friend);
    })
    
  }
}



