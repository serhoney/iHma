import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { User } from '../../models/user';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// @IonicPage()
@Component({
  selector: 'page-dog-swipe-details',
  templateUrl: 'dog-swipe-details.html',
})
export class DogSwipeDetailsPage {

  // userInfo: User = new User();

  ImgURL:any;
  objArrayDogData: any = {};
  objArrayUserData: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public appConfig:AppConfigProvider,
    public http: Http) {

    this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    this.objArrayDogData = this.navParams.get('dogs');
    this.objArrayUserData = this.navParams.get('userdata');

  }

  dismiss() {
     this.viewCtrl.dismiss();
   }

}
