import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  objContact:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.objContact = this.navParams.get('passObject');
    console.log(this.objContact);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  btnBack(){
    console.log('ionViewDidLoad DetailPage');
    this.navCtrl.setRoot(DashboardPage,{},{animate:true,direction:'back'});
  }

}
