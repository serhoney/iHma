import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ChatBoxPage } from '../chat-box/chat-box';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

// @IonicPage()
@Component({
  selector: 'page-matches-dog',
  templateUrl: 'matches-dog.html',
})
export class MatchesDogPage {

  users: any;
  ImgURL: any;
  dogData: any;
  objArrayData:any ={};
  objArrayMsg :any;
  userid:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public appConfig:AppConfigProvider,
    public http: Http
    ) {
      this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    }

  /** Do any initialization */
  ngOnInit() {
    this.getUserList();
    this.userid = this.navParams.get('User');
    this.dogData = this.navParams.get('dog');
    console.log(this.dogData);
    this.getAdoptedList();

    // var webservice = this.appConfig.webAPI+"/webservice/ws_list_adopted_chat_list.php";
    // var data = JSON.stringify({
    //   // var_id: 2
    //   var_id: this.dogData.dog_userno,
    //   var_dogid: this.dogData.dog_id
    // });

    // this.http.post(webservice,data)
    // .subscribe(data=>{
    //   var response = JSON.parse(data["_body"]);
    //   if(response.results){
    //     this.objArrayData = response.results;
    //     console.log(this.objArrayData);
    //   }
    // },error=>{
    //   console.log(error);
    // })
  }

  getAdoptedList(){
    var webservice = this.appConfig.webAPI+"/webservice/ws_list_adopted_chat_list.php";
    var data = JSON.stringify({
      // var_id: 2
      var_id: this.dogData.dog_userno,
      var_dogid: this.dogData.dog_id
    });
    console.log("xxx",data);

    this.http.post(webservice,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results){
        this.objArrayData = response.results;
        this.objArrayMsg = response.results;
        console.log(this.objArrayData);
      }
    },error=>{
      console.log(error);
    })
  }

  getUserList() {
    this.dataProvider.getUserList().subscribe((data: any) => {
      this.users = data;
    });
  }
  openChatBox(user) {
    var useridname ={
      dog_userid: user.dog_userno,
      dog_username: user.Own_name,
    }

    // this.modalCtrl.create(ChatBoxPage,{userData : user,userid : useridname}).present();

    let modal = this.modalCtrl.create(ChatBoxPage,{ userData : user,userid : useridname,User:this.userid,user_status:0});
    modal.onDidDismiss(() => {
      this.getAdoptedList();
    });
    modal.present();


  }

  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    // this.viewCtrl.dismiss();
    this.navCtrl.setRoot(HomePage, {opentab: 2 , userData : this.userid});
  }
}
