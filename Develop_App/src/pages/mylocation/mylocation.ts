import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LocationPage } from '../location/location';
import { SettingsPage } from '../settings/settings';

// @IonicPage()
@Component({
  selector: 'page-mylocation',
  templateUrl: 'mylocation.html',
})
export class MylocationPage {

  objArrayData : any ;
  userSetting : any ;
  user_no : any ;
  userLocation : any;
  userCurrentLocation : any;
  form:any = {};
  userSelectedLocation : any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      public appConfig:AppConfigProvider,
      public http: Http,
      ) {
        }
        ngOnInit(){
          this.user_no = this.navParams.get('passObj');
          this.userSelectedLocation = this.navParams.get('userSelectedLocation');
          console.log(this.user_no);
          console.log(this.userSelectedLocation);
          this.getLocation();


        }

  getLocation(){
    var data = JSON.stringify({
      var_id: this.user_no.id
    });

    var webservicelocation = this.appConfig.webAPI+"/webservice/ws_list_mylocation.php";
    var webservicecurrentlocation = this.appConfig.webAPI+"/webservice/ws_list_mycurrentlocation.php";

      this.http.post(webservicelocation,data)
      .subscribe(data=>{
        var response = JSON.parse(data["_body"]);
        if(response.results){
          this.userLocation = response.results;
        }
      },error=>{
        console.log(error);
      })

      this.http.post(webservicecurrentlocation,data)
      .subscribe(data=>{
        var response = JSON.parse(data["_body"]);
        if(response.results){
          this.userCurrentLocation = response.results;
        }
      },error=>{
        console.log(error);
      })

    this.form.txt_location = this.userSelectedLocation;
  }

  openLocationPage() {
    // this.modalCtrl.create('LocationPage').present();
    // console.log(this.userCurrentLocation);
    // this.modalCtrl.create(LocationPage,{ passObj: this.userCurrentLocation ,userSelectedLocation: this.userSelectedLocation }).present();
    // this.navCtrl.setRoot(LocationPage, {passObj: this.userCurrentLocation ,userSelectedLocation: this.userSelectedLocation}, { animate: true, direction: 'back' });


    let modal = this.modalCtrl.create(LocationPage,{ passObj: this.userCurrentLocation ,userSelectedLocation: this.userSelectedLocation });
    modal.onDidDismiss(() => {
      this.getLocation();
    });
    modal.present();

  }

  dismiss() {
    // this.viewCtrl.dismiss();

    var data = JSON.stringify({
      var_userno:this.user_no.id,
      var_location:this.form.txt_location,
    });

    var webserviceupdatelocation = this.appConfig.webAPI+"/webservice/ws_update_location.php";
    this.http.post(webserviceupdatelocation,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results=="success_update"){
         console.log(this.user_no);
        this.modalCtrl.create(SettingsPage,{ user_no: this.user_no }).present();
        // this.viewCtrl.dismiss({ user_no: this.user_no });
      }
    },error=>{
      console.log(error);
    })

    // this.modalCtrl.create('SettingsPage').present();

  }

}
