import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,App } from 'ionic-angular';
// import { DataProvider } from '../../providers/data/data';

import { AppConfigProvider } from '../../providers/app-config/app-config';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { SwipePage } from '../swipe/swipe';

// @IonicPage()
@Component({
  selector: 'page-myrequest',
  templateUrl: 'myrequest.html',
})
export class MyrequestPage {

  objArrayData: any;
  ImgURL:any;
  userData : any ;
  userId:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public appConfig:AppConfigProvider,
    private storage:Storage,
    public app: App,
    public http: Http) {

    }

  /** Do any initialization */
  ngOnInit() {


    this.userId = this.navParams.get('userData');

      this.userData ={
        id  : this.userId.id
      }


    this.ImgURL = this.appConfig.webAPI+"/upload777/breed_images";
    this.getlist();

  }
  getlist(){
    var webservice = this.appConfig.webAPI+"/webservice/ws_list_myreq.php";
       var data = JSON.stringify({
           var_id: this.userData.id
         });

         this.http.post(webservice,data)
         .subscribe(data=>{
           var response = JSON.parse(data["_body"]);
           this.objArrayData = response.results;
           if(response.results){
             console.log(response.results);
           }
         },error=>{
           console.log(error);
         })
  }

  openSwipe(req){
    // this.navCtrl.setRoot(SwipePage,{userData : this.userId});
    // this.app.getRootNav(SwipePage,{userData : this.userId});
    // this.app.getRootNav().setRoot(SwipePage,{userData : this.userId});
    // this.app.getRootNav().setRoot(HomePage,{userData : this.userId});
    // this.navCtrl.setRoot(SwipePage,{userData : this.userId});
    // this.app.getRootNav().setRoot(HomePage, {opentab: 2 , userData : this.userId});
    console.log(req);
    if(req.count==0){
      return
    }else{
      this.navCtrl.setRoot(HomePage, {opentab: 1 , userData : this.userId,swipe : req.req_no});
    }
    // this.app.getRootNav().push(SwipePage, {opentab: 1 , userData : this.userId});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  unactive(req_no){

    var webservice = this.appConfig.webAPI+"/webservice/ws_update_active_req.php";
    // setTimeout(()=>{
       // this.storage.get('userData').then((val) => {
        var data = JSON.stringify({
            var_id: req_no
          });

          this.http.post(webservice,data)
          .subscribe((data:any)=>{
            var response = JSON.parse(data["_body"]);
            if(response.results=="success_update"){
              console.log(response.results);
              this.getlist();
            }
          },error=>{
            console.log(error);
          })
  }

  // /**
  //  * --------------------------------------------------------------
  //  * List of users
  //  * --------------------------------------------------------------
  //  * @method    getUserList
  //  */
  // getUserList() {
  //   this.dataProvider.getUserList().subscribe((data: any) => {
  //     this.users = data;
  //   });
  // }

}
