import { Component, OnInit } from '@angular/core';
import { MainappService } from '../mainapp.service';

import { Toast } from '@ionic-native/toast/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
getotp=false;
submitform=true;
submitotp=false;

user={
  mobile:'',
  nickname:"",
  fullname:"",
  country:"IN"
}
otp='';
  constructor(
    private service :MainappService,
    private toast: Toast,
    private storage: Storage,
    private route:Router
    ) { }

  ngOnInit() {
  }

  getOtp()
  {
    
    let _self = this;
    this.service.sendOtp(this.user.mobile,function(data){
      console.log(data);
      if(data.status=="success")
      {
        _self.getotp=true;
        _self.submitform=false;
        _self.toast.show(data.msg, '5000', 'center').subscribe(
          mtoast => {
            console.log(mtoast);
          }
        );

      }else{
        console.log("Error");

        _self.toast.show(data.msg, '5000', 'center').subscribe(
          mtoast => {
            console.log(mtoast);
          }
        );

      }
    })
  }

  submitOtp()
  {
    let _self=this;
    _self.service.verifyotp(this.user.mobile,this.otp,function(data){

      if(data.status=="success")
      {
        
        if(!data.msg)
        {
        _self.submitform=false;
        _self.getotp=false;
        _self.submitotp=true;
        _self.user.fullname=data.fullname;
        _self.user.nickname = data.nickname;
        }
      }else{
        console.log("Error");
      }

    })
   

  }

  signupForm()
  {
    let _self = this;
    this.service.signUp(this.user,function(data){
      _self.storage.set('mobile', data.mobile);
      _self.storage.set('id', data.id);
      _self.storage.set('is_login', true);
      localStorage.setItem("is_login","1");
      _self.route.navigateByUrl("/tabs/Chats");
    })
    
  }

}
