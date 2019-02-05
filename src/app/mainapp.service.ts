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
  baseUrl:string = "http://localhost:3001";

  constructor(private  httpClient : HttpClient) { }

  login(username,password,callback)
  {
    this.httpClient.get(this.baseUrl+"/login").subscribe(user=>{
      callback(user);
    });

  }
}



