/**
 * This file represents a component of Edit Profile
 * File path - '../../../../src/pages/edit-profile/edit-profile'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
// import { Camera, CameraOptions } from '@ionic-native/camera';

import { AppConfigProvider } from '../../providers/app-config/app-config';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// @IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  public base64Image: string;
  img1: any = 'assets/imgs/13.jpg';
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  userData : any;
  form :any ={};
  // about : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appConfig:AppConfigProvider,
    public toastCtrl: ToastController,
    public http: HttpClient,
    // private camera: Camera
    ) {
  }

  ngOnInit() {
    this.userData = this.navParams.get('user_no');
    console.log(this.userData);

    var data = JSON.stringify({
      var_userno:this.userData.id
    });

    var webservice = this.appConfig.webAPI+"/webservice/ws_list_myabout.php";
    this.http.post(webservice,data)
    .subscribe((data:any)=>{
      // console.log(data.results)
      // var response = JSON.parse(data["_body"]);
      var response = data;
      if(response.results){
        // console.log(response.results[0]);
        this.form.txt_about = response.results[0].about;

      }
    },error=>{
      console.log(error);
    })

  }

  /**
   * --------------------------------------------------------------
   * Open Gallery & Select Photo
   * --------------------------------------------------------------
   * @method    takePhoto
   * @param     num    Image Number
   */
  // takePhoto(num) {
  //   // Camera Options
  //   const options: CameraOptions = {
  //     quality: 50,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetWidth: 500,
  //     targetHeight: 500
  //   }
  //   this.camera.getPicture(options).then((base64String: string) => {
  //     this.base64Image = "data:image/*;base64," + base64String;

  //     if (num == 1) {
  //       this.img1 = this.base64Image;
  //     }
  //     if (num == 2) {
  //       this.img2 = this.base64Image;
  //     }
  //     if (num == 3) {
  //       this.img3 = this.base64Image;
  //     }
  //     if (num == 4) {
  //       this.img4 = this.base64Image;
  //     }
  //     if (num == 5) {
  //       this.img5 = this.base64Image;
  //     }
  //     if (num == 6) {
  //       this.img6 = this.base64Image;
  //     }
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  showtoast(msg){
    let toast = this.toastCtrl.create({
      message: msg ,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  /**
   * This function dismiss the popup modal
   */
  dismiss() {
    // this.viewCtrl.dismiss();
    var webservice = this.appConfig.webAPI+"/webservice/ws_update_profile.php";

    var data = JSON.stringify({
      var_userno:this.userData.id,
      var_userabout:this.form.txt_about
    });

    console.log(this.form.txt_about.length);
    if(this.form.txt_about.length > 500){
      this.showtoast("โปรดใส่รายละเอียดเกี่ยวกับคุณไม่เกิน 500 ตัวอักษร");
      return
    }

    this.http.post(webservice,data)
    .subscribe((data:any)=>{
      // console.log(data.results)
      // var response = JSON.parse(data["_body"]);
      var response = data;
      console.log(response)
      if(response.results=="success_update"){
        console.log(response.results);
        this.viewCtrl.dismiss();
      }
    },error=>{
      console.log(error);
    })
  }
}
