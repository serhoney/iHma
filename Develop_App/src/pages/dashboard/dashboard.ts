import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  objArrayData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public http: Http) {
  }

  ionViewDidLoad() {
    this.http.get("http://www.senchabox.com/ionic/www_web_api/webservice/ws_list.php")
    .map(res => res.json())
    .subscribe(data => {
      console.log(data.results);
      this.objArrayData = data.results;
    });
    console.log('ionViewDidLoad DashboardPage');
  }

  btnDetail(record){
    // console.log(record);
    this.navCtrl.setRoot(DetailPage,{ passObject:record },{animate:true,direction:'forward'});
  }

  btnGo(){
    this.navCtrl.setRoot(DetailPage,{},{animate:true,direction:'forward'});
    console.log('test');
  }

}
