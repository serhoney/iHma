import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { AdmobProvider } from '../providers/admob/admob';
import { LandingPage } from '../pages/landing/landing';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage: any = LandingPage;

  rootPage: any;  // <<< Do not set the root page until the platform.ready()
                  //      This avoids to face the plugin loading error.


  constructor(public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    //public admobProvider: AdmobProvider
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = LandingPage;
      statusBar.styleDefault();
      splashScreen.hide();

      /*
      if (this.platform.is('ios') || this.platform.is('android')) {

        // Show Video Ad After 1 Minutes
        setInterval(() => {
          this.prepareAdmobVideo();
        }, 120000);

        // Show Interstitial Ad After 30 Sec
        setInterval(() => {
          this.prepareInterstitial();
        }, 60000);
      }
      */
    });
  }

  /**
   * Prepare and show admob Video ad

  prepareAdmobVideo() {
    this.admobProvider.prepareAdmobVideo();
  }
 */
  /**
   * Prepare and show admob Interstitial Ad

  prepareInterstitial() {
    this.admobProvider.prepareInterstitial();
  }*/
}
