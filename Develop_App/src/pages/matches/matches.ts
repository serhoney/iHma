import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { MatchesDogPage } from '../matches-dog/matches-dog';
import { ChatBoxPage } from '../chat-box/chat-box';


import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

// @IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  users: any;
  userData : any = {};
  objArrayData : any;
  objArrayWanted : any;
  ImgURL : any;

  objdogact : any ={};
  userId : any ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataProvider: DataProvider,
    public modalCtrl: ModalController,
    public appConfig:AppConfigProvider,
    private storage:Storage,
    public http: Http
    ) {
      this.ImgURL = this.appConfig.webAPI+"/upload777/img";
    }

  /** Do any initialization */
  ngOnInit() {

    this.userId = this.navParams.get('userData');

    //setTimeout(()=>{
      // this.storage.get('userData').then((val) => {
        this.userData = JSON.stringify({
          // var_id: 2
          var_id: this.userId.id
        });

        this.getMatchDogList(this.userData);

      // });
   // },1000);


    this.getUserList();
  }


  /**
   * --------------------------------------------------------------
   * List of Match List
   * --------------------------------------------------------------
   *
   */
  getMatchDogList(userData){
    // console.log(userData);
    var webservice = this.appConfig.webAPI+"/webservice/ws_list_mymatches.php";
    this.http.post(webservice,userData)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results){
        this.objArrayData = response.results;
      }
    },error=>{
      console.log(error);
    })

    var webservice2 = this.appConfig.webAPI+"/webservice/ws_list_mywanted_list.php";
    this.http.post(webservice2,userData)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      if(response.results){
        this.objArrayWanted = response.results;
        console.log(response.results);
      }
    },error=>{
      console.log(error);
    })

  }


  /**
   * --------------------------------------------------------------
   * List of users
   * --------------------------------------------------------------
   * @method    getUserList
   */
  getUserList() {
    this.dataProvider.getUserList().subscribe((data: any) => {
      this.users = data;
    });
  }

  /**
   * --------------------------------------------------------------
   * Open Chat Page
   * --------------------------------------------------------------
   * @method    openChatBox
   */
  openChatBox(dogs) {
    // this.modalCtrl.create(ChatBoxPage).present();
    var useridname ={
      dog_userid: dogs.user_no,
      dog_username: dogs.UserName,
    }
    // console.log(dogs);
    this.modalCtrl.create(ChatBoxPage,{ userData : dogs , userid : useridname , User:this.userId ,user_status:1 }).present();
  }



  openMatchesDogPage(dogs) {
    this.modalCtrl.create(MatchesDogPage,{dog : dogs, User:this.userId }).present();
  }

}
