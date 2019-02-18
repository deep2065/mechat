import { Injectable } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { MainappService } from './mainapp.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private contacts: Contacts,
    private service:MainappService,
    private storage: Storage,
    ) { }

  getAllContacts(callback)
  {    
    callback(this.contacts.find(["*"]))
  }

  saveContact()
  {
    let _self=this;
    this.storage.get("id").then((val)=>{
      _self.getAllContacts(function(data){
      if(data)
      {
        data.then((contact)=>{       
        contact.forEach(element => {         

        let indata =  {
          uid:val,
          name:element.name.formatted,
          mobile:element.phoneNumbers?element.phoneNumbers[0].value:'',
          country:"IN"

        }  
        _self.service.saveContact(indata,function(res){
      console.log(res);
        })
      });
    })
    }
    });
  });
  }
}
