
import { Component ,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { SwipePage } from '../swipe/swipe';
import { MatchesPage } from '../matches/matches';


import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tab1: any;
  tab2: any;
  tab3: any;

  userData: any;
  seltabix:any;
  swipe:any;

  objArrayData:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public detectorRef: ChangeDetectorRef,

    public appConfig:AppConfigProvider,
    public http: Http
    ) {

    this.userData = this.navParams.get('userData');

    var webservice = this.appConfig.webAPI+"/webservice/ws_count_chat.php";
    var data = JSON.stringify({
      var_id: this.userData.id
    });

    this.http.post(webservice,data)
    .subscribe(data=>{
      console.log(JSON.parse(data["_body"]))
      var response = JSON.parse(data["_body"]);
      if(response.results){
        this.objArrayData = response.results[0].Count;
        console.log(this.objArrayData);

      detectorRef.detectChanges();
      }
    },error=>{
      console.log(error);
    })



    this.seltabix = this.navParams.get('opentab') || 0;
    this.swipe = this.navParams.get('swipe') || 0;

    this.tab1 = ProfilePage;
    this.tab2 = SwipePage;
    this.tab3 = MatchesPage;
  }



}

