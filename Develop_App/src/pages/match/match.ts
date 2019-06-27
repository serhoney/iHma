import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { User } from '../../models/user';


import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ChatBoxPage } from '../chat-box/chat-box';

// @IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  userInfo: User = new User();

  ImgURL: any ;
  objArrayDogData: any ;
  objArrayUserData: any ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public appConfig:AppConfigProvider,
    public viewCtrl: ViewController,
    private storage:Storage,
    public http: Http) {

    }

  /** Do any initialization */
  ngOnInit() {
    // Get user information
    // this.userInfo = this.navParams.get('user');

    this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    this.objArrayDogData = this.navParams.get('dogs');
    this.objArrayUserData = this.navParams.get('userdata');

    console.log(this.objArrayDogData);
    console.log(this.objArrayUserData);

  }

  /**
   * --------------------------------------------------------------
   * Open Chat Page
   * --------------------------------------------------------------
   * @method    goToChatPage
   */
  goToChatPage() {
    this.modalCtrl.create(ChatBoxPage).present();
  }

  /**
   * --------------------------------------------------------------
   * Dismiss
   * --------------------------------------------------------------
   * @method    dismiss   Back to Home Page
   */
  dismiss() {
    // this.navCtrl.setRoot('SwipePage');
    this.viewCtrl.dismiss();
  }
}
