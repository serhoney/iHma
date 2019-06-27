import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MydogUserDetailsPage } from '../mydog-user-details/mydog-user-details';
import { MydogpagePage } from '../mydogpage/mydogpage';


// @IonicPage()
@Component({
  selector: 'page-mydoglistadopted',
  templateUrl: 'mydoglistadopted.html',
})
export class MydoglistadoptedPage {

  objArrayData : any;
  dog_id : any;
  dogData: any;
  ImgURL :any;
  userId : any;
  userData : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public appConfig:AppConfigProvider,
    public http: Http) {
      this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    }

    ngOnInit() {

      this.userId = this.navParams.get('userData');

      var webservice = this.appConfig.webAPI+"/webservice/ws_list_mydog_adopted.php";

      this.dog_id = this.navParams.get('dog_id');
      this.dogData = JSON.stringify({
        var_dogid: this.dog_id
      });

      this.http.post(webservice,this.dogData)
      .subscribe(data=>{
        var response = JSON.parse(data["_body"]);
        if(response.results){
          console.log(response.results);
          this.objArrayData = response.results;
        }
      },error=>{
        console.log(error);
      })



    }
  /**
   * --------------------------------------------------------------
   *  Open Profile Details Page
   * --------------------------------------------------------------
   * @method    goToMyDogUserDetailsPage
   */
  goToUserDetailsPage(adopted) {
    this.modalCtrl.create(MydogUserDetailsPage,{passObj : adopted ,userData : this.userId }).present();
  }
  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    // this.viewCtrl.dismiss();
    // this.userId = this.navParams.get('userData');
    // this.userData ={
    //   id  : this.userId.id,
    //   lat : this.userId.lat,
    //   lng : this.userId.lng
    // }
    this.modalCtrl.create(MydogpagePage,{ userData : this.userId }).present();
  }

}
