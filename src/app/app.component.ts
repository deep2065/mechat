import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';

import {MainappService} from './mainapp.service'
import { Router } from '@angular/router';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socket: Socket,
    private storage: Storage,
    private service:MainappService,
    private route:Router,
    private contact:ContactsService, 
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('mobile').then((val) => {
        if(val)
        {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.socket.connect();
        this.socket.emit("login",val);
        this.contact.saveContact();
      }else{
        this.route.navigateByUrl("/login");
      }
         });
      
     
    });
  }


  




}
