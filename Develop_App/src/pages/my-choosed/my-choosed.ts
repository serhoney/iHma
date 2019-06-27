import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// @IonicPage()
@Component({
  selector: 'page-my-choosed',
  templateUrl: 'my-choosed.html',
})
export class MyChoosedPage {

  objArrayData: any;
  ImgURL:any;
  userData : any ;
  userId: any;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController,
     public modalCtrl: ModalController,
     public appConfig:AppConfigProvider,
     public http: Http
     ) {
      this.ImgURL = this.appConfig.webAPI+"/upload777/img";
      this.userId = this.navParams.get('userData');
      this.getDogList();
     }

  getDogList(){
    var webservice = this.appConfig.webAPI+"/webservice/ws_list_mychoosed.php";
    this.userData = JSON.stringify({
      var_id: this.userId.id
    });

    this.http.post(webservice,this.userData)
    .subscribe(data=>{
      console.log(JSON.parse(data["_body"]))
      var response = JSON.parse(data["_body"]);
      if(response.results){
        console.log(response.results);
        this.objArrayData = response.results;
      }
    },error=>{
      console.log(error);
    })

  }
  dismiss() {
    this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(HomePage);
    // this.navCtrl.setRoot(HomePage,{userData : this.userId});
  }

}
