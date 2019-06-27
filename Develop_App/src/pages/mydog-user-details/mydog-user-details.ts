import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, ModalController } from 'ionic-angular';
// import { User } from '../../models/user';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MydoglistadoptedPage } from '../mydoglistadopted/mydoglistadopted';


// @IonicPage()
@Component({
  selector: 'page-mydog-user-details',
  templateUrl: 'mydog-user-details.html',
})
export class MydogUserDetailsPage {

  // userInfo: User = new User();
  userInfo: any;
  ImgURL :any;
  userId: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public appConfig:AppConfigProvider,
    public http: Http
    ) {
    this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    // Get user information

    this.userId = this.navParams.get('userData');
    this.userInfo = this.navParams.get('passObj');
    console.log(this.userInfo);
  }

  like(status: boolean) {

    var data = JSON.stringify({
      var_dogid:this.userInfo.dog_id,
      var_dogownerno:this.userInfo.dog_userno,
      var_adoptedno:this.userInfo.no
    });
    console.log(data);

    var webservice = this.appConfig.webAPI+"/webservice/ws_update_matching_owner.php";

    // If status is true, current user like this `removedUser` user otherwise dislike
    if (status) {

      this.http.post(webservice,data)
      .subscribe(data=>{
        var response = JSON.parse(data["_body"]);
        console.log(response.results);
        if(response.results=="success_update"){
          this.modalCtrl.create(MydoglistadoptedPage,{ dog_id: this.userInfo.dog_id ,userData : this.userId }).present();
        }
      },error=>{
        console.log(error);
      })

      // this.goToMatchPage(this.swipeDog);

    } else {
      console.log(status);
      this.viewCtrl.dismiss({ dog_id: this.userInfo.dog_id ,userData : this.userId });
    }
  }

  /**
   * --------------------------------------------------------------
   * Dismiss
   * --------------------------------------------------------------
   * @method    dismiss   Back to Home Page
   */
  dismiss() {
    // this.navCtrl.setRoot('HomePage');
    this.viewCtrl.dismiss({ dog_id: this.userInfo.dog_id ,userData : this.userId });
  }
}
