import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard'
import { FCM } from '@ionic-native/fcm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = DashboardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if(platform.is('cordova')){
        this.initApp();
    }
    });
  }
  
  initApp(){

    this.fcm.subscribeToTopic('senchabox_broadcast');

    this.fcm.getToken().then(token => {
    alert(token);
    });

    this.fcm.onNotification().subscribe(data => {
    if(data.wasTapped){
        console.log("Received in background");
    } else {
        console.log("Received in foreground");
    }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
    alert(token);
    });

}
}

