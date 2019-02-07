import { Component, OnInit } from '@angular/core';
import { MainappService } from '../mainapp.service';

import { Toast } from '@ionic-native/toast/ngx';

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
  nicname:"",
  fullname:"",
  country:"IN"
}
otp='';
  constructor(private service :MainappService,private toast: Toast) { }

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
        _self.submitform=false;
        _self.getotp=false;
        _self.submitotp=true;
      }else{
        console.log("Error");
      }

    })
   

  }

  signupForm()
  {
    this.service.signUp(this.user,function(data){
      console.log(data);
    })
    
  }

}
