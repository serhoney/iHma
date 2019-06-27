import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MylocationPage } from '../mylocation/mylocation';
import { LandingPage } from '../landing/landing';
import { HomePage } from '../home/home';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// @IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  ages: any;

  form:any = {};

  userSetting : any ={};

  userNo : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appConfig:AppConfigProvider,
    public modalCtrl: ModalController,
    public http: Http,
    public fb: Facebook
    ) {
  }

  ngOnInit() {
    this.userNo = this.navParams.get('user_no');

    var data = JSON.stringify({
      var_userno:this.userNo.id
    });
    console.log(this.userNo.id);

    var webserviceupdatelocation = this.appConfig.webAPI+"/webservice/ws_list_mysetting.php";
    this.http.post(webserviceupdatelocation,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results){
        // this.modalCtrl.create('SettingsPage').present();
        this.userSetting = response.results[0];
        this.form.txt_distance = this.userSetting.max_distance;
        this.form.txt_ages_range = { lower: this.userSetting.min_age_range, upper: this.userSetting.max_age_range };
        console.log( this.userSetting);
      }
    },error=>{
      console.log(error);
    })

}

  ngAfterViewInit(): void {
    // this.form.txt_ages_range = { lower: 0, upper: 12 };
    // this.form.txt_distance = 30;
  }

  SaveSetting(){
    var data = JSON.stringify({
      var_userno:this.userNo.id,
      var_distance:this.form.txt_distance,
      var_age_min:this.form.txt_ages_range.lower,
      var_age_max:this.form.txt_ages_range.upper,
    });
    var webserviceupdatesetting = this.appConfig.webAPI+"/webservice/ws_update_setting.php";
    this.http.post(webserviceupdatesetting,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results){
        console.log(response.results);
      }
    },error=>{
      console.log(error);
    })

  }

  openLocationPage() {
    // this.modalCtrl.create('MylocationPage').present();
    this.modalCtrl.create(MylocationPage,{ passObj: this.userNo , userSelectedLocation : this.userSetting.location_no }).present();
    // this.navCtrl.setRoot('LocationPage');
  }

  // Logout
  logout() {
    this.fb.logout();
    this.navCtrl.setRoot(LandingPage);
  }

  dismiss() {
    // this.viewCtrl.dismiss();

    var data = JSON.stringify({
      var_userno:this.userNo.id,
      var_distance:this.form.txt_distance,
      var_age_min:this.form.txt_ages_range.lower,
      var_age_max:this.form.txt_ages_range.upper,
    });

    console.log(data);

    var webserviceupdatesetting = this.appConfig.webAPI+"/webservice/ws_update_setting.php";
    this.http.post(webserviceupdatesetting,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results){
        this.navCtrl.setRoot(HomePage, {userData : this.userNo}, { animate: true, direction: 'back' });
        // this.viewCtrl.dismiss({userData : this.userNo});
      }
    },error=>{
      console.log(error);
    })

  }

}
