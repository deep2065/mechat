import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { MainappService } from '../mainapp.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
friends;
user_id;
  constructor( 
    private contact:ContactsService, 
    private service :MainappService,
    private storage: Storage,
    ) { 
    
  }

  ngOnInit() {
    let self = this;
    this.storage.get("id").then((val)=>{
      this.user_id=val;
      self.service.getAllMyFriends(val,function(friend){
      self.friends=friend;
    });
  });
    
  
  }

  getChat(ele)
  {
    console.log("hi");
  }



}
