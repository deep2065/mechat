import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://103.83.130.169:3001', options: {} };

import { IonicStorageModule } from '@ionic/storage';
import { MainappService } from './mainapp.service';
import { HttpClientModule } from '@angular/common/http'; 

import { Toast } from '@ionic-native/toast/ngx';

import { Contacts } from '@ionic-native/contacts/ngx';
import { ContactsService } from './contacts.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MainappService,
    Toast,
    Contacts,
    ContactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
