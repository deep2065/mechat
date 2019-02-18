import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.page.html',
  styleUrls: ['./chatlist.page.scss'],
})
export class ChatlistPage implements OnInit {

s_id='';
r_id='';
message=[];
key='';
mymsg="";
  constructor(
    private route: ActivatedRoute,
    private storage:Storage,
    private socket: Socket,
    ) { 
      this.r_id=this.route.snapshot.paramMap.get('id');
      let _self = this;
      this.storage.get("id").then((val)=>{
        _self.s_id=val; 
        _self.key=_self.s_id+"_"+_self.r_id;  
        _self.storage.get(_self.key).then((data)=>{
          if(data)
          {
            _self.message = JSON.parse(data);

          }
         
        })     
      })

      


    }

  ngOnInit() {
    let _self=this;
    this.socket.on("message",function(data){
      _self.message.push(data);
      _self.storage.set(_self.key, JSON.stringify(_self.message)); 
      _self.ScrollToBottom();
    })

    
  }

  sendMsg()
  {

    if(this.mymsg && this.mymsg.trim())
    {

    let msgobj = {
      s_id:this.s_id,
      r_id:this.r_id,
      msg:this.mymsg,
      date:new Date()    
    }
  this.message.push(msgobj);
   this.socket.emit("add-message",msgobj);
   this.storage.set(this.key, JSON.stringify(this.message));   
   this.ScrollToBottom();
   

  }
   this.mymsg='';
}

ScrollToBottom(){ 
 // setInterval(function(){
    var element = document.getElementById("msgContent");
    if(element.lastElementChild)
    {
      element.lastElementChild.scrollIntoView(true);
    }
 // },1000);
  
}


}
