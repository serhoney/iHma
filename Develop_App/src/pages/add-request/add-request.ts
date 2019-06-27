import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController, ModalController } from 'ionic-angular';

import { AppConfigProvider } from '../../providers/app-config/app-config';

import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { Storage } from '@ionic/storage';
import { MyrequestPage } from '../myrequest/myrequest';

// @IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {

  form:any = {};
  userData : any = {};
  objArrayColor: any;
  objArrayDogBreed: any;
  userId : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public appConfig:AppConfigProvider,
    public modalCtrl: ModalController,
    private storage:Storage,
    public http2: Http,
    private http: HttpClient
    ) {
    this.form = {};

    let me = this;

    this.userId = this.navParams.get('userData');

      this.userData ={
        id  : this.userId.id,
        lat : this.userId.lat,
        lng : this.userId.lng
      }

    // this.storage.get('userData').then((val) => {
    //   me.userData ={
    //     id: val.id,
    //     lat : val.lat,
    //     lng : val.lng
    //   }
    //   });

      var webservicedogcolor = this.appConfig.webAPI+"/webservice/ws_list_color.php";
      this.http.get(webservicedogcolor)
      .pipe(
        map(res => res)
      ).subscribe((data:any) => {
            this.objArrayColor = data.results;
            console.log(this.objArrayColor);
          });

      var webservicedogbreed = this.appConfig.webAPI+"/webservice/ws_list_dog_breed.php";
      this.http.get(webservicedogbreed)
      .pipe(
        map(res => res)
      ).subscribe((data:any) => {
            this.objArrayDogBreed = data.results;
            console.log(this.objArrayColor);
          });

      // this.http.get(webservicedogcolor)
      // .map(res => res.json())
      // .subscribe(data => {
      //     // console.log(data.results);
      //      this.objArrayColor = data.results;
      // });

      // var webservicedogbreed = this.appConfig.webAPI+"/webservice/ws_list_dog_breed.php";
      // this.http.get(webservicedogbreed)
      // .map(res => res.json())
      // .subscribe(data => {
      //     console.log(data.results);
      //      this.objArrayDogBreed = data.results;
      // });


    }

  ngAfterViewInit(): void {
    this.form.txt_ages_range = { lower: 0, upper: 120 };
  }

  showtoast(msg){
    let toast = this.toastCtrl.create({
      message: msg ,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  SaveReq(){
    // console.log(this.userData);
    // console.log(this.form);


    if(this.form.txt_breed == undefined){
      this.showtoast("Please choose request dog breed");
      return
    }
    if(this.form.txt_color == undefined){
      this.showtoast("Please choose request dog color");
      return
    }
    if(this.form.txt_reqgender == undefined){
      this.showtoast("Please choose request dog gender");
      return
    }

    var data = JSON.stringify({
      var_requserid:this.userData.id,
      var_reqlat:this.userData.lat,
      var_reqlng:this.userData.lng,
      var_reqagemin:this.form.txt_ages_range.lower,
      var_reqagemax:this.form.txt_ages_range.upper,
      var_reqbreed:this.form.txt_breed,
      var_reqcolor:this.form.txt_color,
      var_reqgender:this.form.txt_reqgender
    });

console.log(data);
    var webservicereq = this.appConfig.webAPI+"/webservice/ws_add_req.php";

    this.http2.post(webservicereq,data)
    .subscribe(data=>{
      var response = JSON.parse(data["_body"]);
      console.log(response.results);
      if(response.results=="success_insert"){
        // this.modalCtrl.create('MyrequestPage').present();

        this.navCtrl.setRoot(MyrequestPage,{ userData : this.userData });
        // this.navCtrl.setRoot(MyrequestPage, {}, { animate: true, direction: 'back' });
      }
      else if(response.results=="same_req"){
        this.showtoast("ข้อมูลสุนัขที่อยากได้มีในระบบแล้ว");
      }
    },error=>{
      console.log(error);
    })
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


}
