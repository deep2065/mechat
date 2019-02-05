import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Socket } from 'ng-socket-io';
import { Storage } from '@ionic/storage';

import {MainappService} from './mainapp.service'
import { Router } from '@angular/router';

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
    private route:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.service.is_login)
      {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.socket.connect();
      }else{
        this.route.navigateByUrl("/login");
      }
    });
  }



}


// storage.set('name', 'Max');

// // Or to get a key/value pair
// storage.get('age').then((val) => {
//   console.log('Your age is', val);
// });